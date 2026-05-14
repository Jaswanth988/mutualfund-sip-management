import client from "../utility/pgManager";

type SipData = {
  sip_id: string;
  portfolio_id: string;
  fund_id: string;
  sip_amount: number;
  frequency: string;
  start_date: string;
  status: string;
};

async function addSipDB(data: SipData) {
  try {
    const result = await client.query(
      `
      INSERT INTO sip
      (
        sip_id,
        portfolio_id,
        fund_id,
        sip_amount,
        frequency,
        start_date,
        status
      )
      VALUES
      ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        data.sip_id,
        data.portfolio_id,
        data.fund_id,
        data.sip_amount,
        data.frequency,
        data.start_date,
        data.status,
      ]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

async function getSipByIdDB(id: string) {
  try {
    const result = await client.query(
      `
      SELECT *
      FROM sip
      WHERE sip_id = $1
      `,
      [id]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

async function processSipDB(id: string) {
  try {
    await client.query("BEGIN");

    const sipResult = await client.query(
      `
      SELECT
        s.*,
        f.latest_nav
      FROM sip s
      JOIN funds f
      ON s.fund_id = f.fund_id
      WHERE s.sip_id = $1
      `,
      [id]
    );

    const sip = sipResult.rows[0];

    if (!sip) {
      throw new Error("SIP not found");
    }

    const units =
      Number(sip.sip_amount) /
      Number(sip.latest_nav);

    const transactionResult =
      await client.query(
        `
        INSERT INTO investment_transactions
        (
          portfolio_id,
          fund_id,
          sip_id,
          transaction_type,
          amount,
          nav_value,
          units_allocated,
          transaction_date
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,NOW())
        RETURNING *
        `,
        [
          sip.portfolio_id,
          sip.fund_id,
          sip.sip_id,
          "SIP",
          sip.sip_amount,
          sip.latest_nav,
          units,
        ]
      );

    const holdingResult =
      await client.query(
        `
        SELECT *
        FROM holdings
        WHERE portfolio_id = $1
        AND fund_id = $2
        `,
        [
          sip.portfolio_id,
          sip.fund_id,
        ]
      );

    if (holdingResult.rowCount! > 0) {
      await client.query(
        `
        UPDATE holdings
        SET total_units =
        COALESCE(total_units,0) + $1
        WHERE portfolio_id = $2
        AND fund_id = $3
        `,
        [
          units,
          sip.portfolio_id,
          sip.fund_id,
        ]
      );
    } else {
      await client.query(
        `
        INSERT INTO holdings
        (
          portfolio_id,
          fund_id,
          total_units
        )
        VALUES
        ($1,$2,$3)
        `,
        [
          sip.portfolio_id,
          sip.fund_id,
          units,
        ]
      );
    }

    await client.query("COMMIT");

    return {
      transaction:
        transactionResult.rows[0],
      units_allocated: units,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}

async function getSipTransactionsDB(
  id: string
) {
  try {
    const result = await client.query(
      `
      SELECT *
      FROM investment_transactions
      WHERE sip_id = $1
      ORDER BY transaction_date DESC
      `,
      [id]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function getSipsTransactionsDB(
  portfolioId: string
) {
  try {
    const result = await client.query(
      `
      SELECT
        t.transaction_id,
        t.portfolio_id,
        t.fund_id,
        t.sip_id,
        t.transaction_type,
        t.amount,
        t.nav_value,
        t.units_allocated,
        t.transaction_date,
        f.fund_name

      FROM investment_transactions t

      JOIN funds f
      ON t.fund_id = f.fund_id

      WHERE t.portfolio_id = $1

      ORDER BY t.transaction_date DESC
      `,
      [portfolioId]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
}

export {
  addSipDB,
  getSipByIdDB,
  processSipDB,
  getSipTransactionsDB,
  getSipsTransactionsDB,
};