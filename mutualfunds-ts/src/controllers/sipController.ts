import { Request, Response } from "express";

import {
  addSipDB,
  getSipByIdDB,
  processSipDB,
  getSipsTransactionsDB,
} from "../models/sipModel";

import client from "../utility/pgManager";

const toStr = (value: string | string[]): string =>
  Array.isArray(value) ? value[0] : value;

export const addsip = async (req: Request, res: Response) => {
  try {
    const sip = await addSipDB(req.body);

    const transaction = await processSipDB(sip.sip_id);

    return res.status(201).json({
      message: "SIP created successfully",
      transaction,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getsipbyid = async (req: Request, res: Response) => {
  try {
    const id = toStr(req.params.id);

    const sip = await getSipByIdDB(id);

    if (!sip) {
      return res.status(404).json({ error: "SIP not found" });
    }

    return res.json(sip);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const sipprocess = async (req: Request, res: Response) => {
  try {
    const id = toStr(req.params.id);

    const transaction = await processSipDB(id);

    return res.json({
      message: "SIP processed successfully",
      transaction,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getsiptranscations = async (req: Request, res: Response) => {
  try {
    const id = toStr(req.params.id);

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
      JOIN funds f ON t.fund_id = f.fund_id
      WHERE t.portfolio_id = $1

      UNION ALL

      SELECT
          s.sip_id AS transaction_id,
          s.portfolio_id,
          s.fund_id,
          s.sip_id,
          'SIP_CREATED' AS transaction_type,
          s.sip_amount AS amount,
          0 AS nav_value,
          0 AS units_allocated,
          s.start_date AS transaction_date,
          f.fund_name
      FROM sip s
      JOIN funds f ON s.fund_id = f.fund_id
      WHERE s.portfolio_id = $1

      ORDER BY transaction_date DESC
      `,
      [id]
    );

    return res.json(result.rows);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getsiptranscationss = async (req: Request, res: Response) => {
  try {
    const portfolioId = toStr(req.params.portfolioId);

    const transactions = await getSipsTransactionsDB(portfolioId);

    return res.json(transactions);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};