import express from "express";

import {
  addinvestor,
  getinvestor,
  investorholdings,
  investornetworth,
  login,
} from "../controllers/investorController";

import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/login",
  login
);

router.post(
  "/addinvestor",
  addinvestor
);

router.get(
  "/:id",
  authMiddleware,
  getinvestor
);

router.get(
  "/holdings/:id",
  investorholdings
);

router.get(
  "/networth/:id",
  investornetworth
);

export default router;