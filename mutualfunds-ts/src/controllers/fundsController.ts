import {
  Request,
  Response,
} from "express";

import client from "../utility/pgManager";

type BuyFundBody = {
  portfolio_id: number;
  fund_id: number;
  amount: number;
};

type AddFundBody = {
  fund_id: number;
  fund_name: string;
  amc_id: number;
  category: string;
  risk_level: string;
  latest_nav: number;
};

type UpdateNavBody = {
  latest_nav: number;
};

const buyFund = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      portfolio_id,
      fund_id,
      amount,
    } = req.body as BuyFundBody;

    console.log("BUY API HIT");

    await client.query("BEGIN");

    /* GET FUND */

    const fundResult =
      await client.query(
        `
        SELECT *
        FROM funds
        WHERE fund_id = $1
        `,
        [fund_id]
      );

    if (fundResult.rowCount === 0) {

      throw new Error(
        "Fund not found"
      );
    }

    const fund =
      fundResult.rows[0];

    const nav =
      Number(fund.latest_nav);

    const units =
      Number(amount) / nav;

    console.log("NAV:", nav);

    console.log("Units:", units);

    /* INSERT TRANSACTION */

    const transactionInsert =
      await client.query(
        `
        INSERT INTO investment_transactions
        (
          portfolio_id,
          fund_id,
          transaction_type,
          amount,
          nav_value,
          units_allocated
        )
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
          portfolio_id,
          fund_id,
          "BUY",
          amount,
          nav,
          units,
        ]
      );

    console.log(
      "TRANSACTION INSERTED"
    );

    /* CHECK HOLDINGS */

    const holdingResult =
      await client.query(
        `
        SELECT *
        FROM holdings
        WHERE portfolio_id = $1
        AND fund_id = $2
        `,
        [
          portfolio_id,
          fund_id,
        ]
      );

    if (
      holdingResult.rowCount &&
      holdingResult.rowCount > 0
    ) {

      await client.query(
        `
        UPDATE holdings
        SET total_units =
        total_units + $1
        WHERE portfolio_id = $2
        AND fund_id = $3
        `,
        [
          units,
          portfolio_id,
          fund_id,
        ]
      );

      console.log(
        "HOLDINGS UPDATED"
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
        ($1, $2, $3)
        `,
        [
          portfolio_id,
          fund_id,
          units,
        ]
      );

      console.log(
        "HOLDINGS INSERTED"
      );
    }

    await client.query("COMMIT");

    return res.status(201).json({

      message:
        "Fund purchased successfully",

      transaction:
        transactionInsert.rows[0],
    });

  } catch (err: any) {

    await client.query(
      "ROLLBACK"
    );

    console.log(err);

    return res.status(500).json({
      error: err.message,
    });
  }
};

const addfund = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      fund_id,
      fund_name,
      amc_id,
      category,
      risk_level,
      latest_nav,
    } = req.body as AddFundBody;

    const result =
      await client.query(
        `
        INSERT INTO funds
        (
          fund_id,
          fund_name,
          amc_id,
          category,
          risk_level,
          latest_nav
        )
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
          fund_id,
          fund_name,
          amc_id,
          category,
          risk_level,
          latest_nav,
        ]
      );

    return res.status(201).json({
      message:
        "Fund added successfully",

      fund: result.rows[0],
    });

  } catch (err: any) {

    return res.status(500).json({
      error: err.message,
    });
  }
};

const getallfunds = async (
  req: Request,
  res: Response
) => {

  try {

    const result =
      await client.query(
        `
        SELECT *
        FROM funds
        `
      );

    return res.json(
      result.rows
    );

  } catch (err: any) {

    return res.status(500).json({
      error: err.message,
    });
  }
};

const updatefundnav = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } =
      req.params;

    const {
      latest_nav,
    } =
      req.body as UpdateNavBody;

    const result =
      await client.query(
        `
        UPDATE funds
        SET latest_nav = $1
        WHERE fund_id = $2
        RETURNING *
        `,
        [
          latest_nav,
          id,
        ]
      );

    if (
      result.rowCount === 0
    ) {

      return res.status(404).json({
        error:
          "Fund not found",
      });
    }

    return res.json({
      message:
        "NAV updated successfully",

      fund:
        result.rows[0],
    });

  } catch (err: any) {

    return res.status(500).json({
      error: err.message,
    });
  }
};

export {
  addfund,
  getallfunds,
  updatefundnav,
  buyFund,
};