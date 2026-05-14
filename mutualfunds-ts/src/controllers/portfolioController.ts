import {
  Request,
  Response,
} from "express";

import client from "../utility/pgManager";

const getPortfolioByInvestor =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const {
        investorId,
      } = req.params;

      const result =
        await client.query(
          `
          SELECT *
          FROM portfolio
          WHERE investor_id = $1
          `,
          [investorId]
        );

      return res.json(
        result.rows[0]
      );

    } catch (error: any) {

      return res.status(500).json({
        error:
          error.message,
      });
    }
  };

export {
  getPortfolioByInvestor,
};