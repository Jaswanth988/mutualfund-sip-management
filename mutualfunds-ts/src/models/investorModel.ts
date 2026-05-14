import db from "../utility/pgManager";

type InvestorData = {
  investor_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  pancard_no: string;
  adhaar_no: string;
  date_of_birth: string;
  gender: string;
  occupation: string;
  password: string;
};

async function logincheck(
  id: string,
  password: string
): Promise<any> {

  try {

    const investor =
      await loginUser(
        id,
        password
      );

    return investor;

  } catch (error) {

    return undefined;
  }
}

async function fetchInvestordata(
  id: string
): Promise<any> {

  try {

    const investor =
      await getInvestorFromDB(
        id
      );

    return investor;

  } catch (error) {

    return undefined;
  }
}

async function getInvestorFromDB(
  id: string
): Promise<any> {

  try {

    const result =
      await db.query(
        `
        SELECT *
        FROM investor
        WHERE investor_id = $1
        `,
        [id]
      );

    return result.rows[0];

  } catch (error) {

    throw error;
  }
}

async function loginUser(
  investor_id: string,
  password: string
): Promise<any> {

  try {

    const result =
      await db.query(
        `
        SELECT *
        FROM investor
        WHERE investor_id = $1
        AND password = $2
        `,
        [
          investor_id,
          password,
        ]
      );

    return result.rows[0];

  } catch (error) {

    throw error;
  }
}

async function addInvestorDB(
  data: InvestorData
): Promise<any> {

  try {

    const result =
      await db.query(
        `
        INSERT INTO investor
        (
          investor_id,
          first_name,
          middle_name,
          last_name,
          pancard_no,
          adhaar_no,
          date_of_birth,
          gender,
          occupation,
          password
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING *
        `,
        [
          data.investor_id,
          data.first_name,
          data.middle_name,
          data.last_name,
          data.pancard_no,
          data.adhaar_no,
          data.date_of_birth,
          data.gender,
          data.occupation,
          data.password,
        ]
      );

    return result.rows[0];

  } catch (error) {

    throw error;
  }
}

async function getInvestorHoldings(
  id: string
): Promise<any> {

  try {

    const result =
      await db.query(
        `
        SELECT
            h.holding_id,
            h.total_units,
            f.fund_name,
            f.latest_nav,
            (h.total_units * f.latest_nav) AS current_value

        FROM holdings h

        JOIN portfolio p
        ON h.portfolio_id = p.portfolio_id

        JOIN funds f
        ON h.fund_id = f.fund_id

        WHERE p.investor_id = $1
        `,
        [id]
      );

    return result.rows;

  } catch (error) {

    throw error;
  }
}

async function getInvestorNetworth(
  id: string
): Promise<number> {

  try {

    const result =
      await db.query(
        `
        SELECT
        SUM(h.total_units * f.latest_nav) AS networth

        FROM holdings h

        JOIN portfolio p
        ON h.portfolio_id = p.portfolio_id

        JOIN funds f
        ON h.fund_id = f.fund_id

        WHERE p.investor_id = $1
        `,
        [id]
      );

    return (
      result.rows[0]
        ?.networth || 0
    );

  } catch (error) {

    throw error;
  }
}

export {
  getInvestorFromDB,
  fetchInvestordata,
  addInvestorDB,
  getInvestorHoldings,
  getInvestorNetworth,
  loginUser,
  logincheck,
};