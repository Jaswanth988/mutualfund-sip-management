import { Request, Response } from "express";
import { signJwt } from "../utility/authManager";
import {
  fetchInvestordata,
  logincheck,
  addInvestorDB,
  getInvestorHoldings,
  getInvestorNetworth,
} from "../models/investorModel";
import { client } from "../redis";

const getParam = (value: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

export const login = async (req: Request, res: Response) => {
  const { id, pass } = req.body;

  const user = await logincheck(id, pass);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signJwt({
    id: user.investor_id,
    role: "investor",
  });

  return res.json({
    token,
    investor_id: user.investor_id,
  });
};

export const addinvestor = async (req: Request, res: Response) => {
  await addInvestorDB(req.body);
  return res.json({ message: "Investor added" });
};

export const getinvestor = async (req: Request, res: Response) => {
  const id = getParam(req.params.id);

  const cache = await client.get(`investor:${id}`);

  if (cache) {
    return res.json(JSON.parse(cache));
  }

  const data = await fetchInvestordata(id);

  if (!data) {
    return res.status(404).json({ error: "Not found" });
  }

  await client.set(`investor:${id}`, JSON.stringify(data), { EX: 60 });

  return res.json(data);
};

export const investorholdings = async (req: Request, res: Response) => {
  const id = getParam(req.params.id);

  const holdings = await getInvestorHoldings(id);

  return res.json(holdings);
};

export const investornetworth = async (req: Request, res: Response) => {
  const id = getParam(req.params.id);

  const networth = await getInvestorNetworth(id);

  return res.json({
    investor_id: id,
    networth,
  });
};