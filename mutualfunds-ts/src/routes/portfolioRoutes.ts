import express from "express";

import {
  getPortfolioByInvestor,
} from "../controllers/portfolioController";

const router = express.Router();

router.get(
  "/investor/:investorId",
  getPortfolioByInvestor
);

export default router;