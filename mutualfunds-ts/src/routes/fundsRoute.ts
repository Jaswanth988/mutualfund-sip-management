import express from "express";

import {
  addfund,
  getallfunds,
  updatefundnav,
  buyFund,
} from "../controllers/fundsController";

const router = express.Router();

router.post(
  "/addfund",
  addfund
);

router.get(
  "/funds",
  getallfunds
);

router.put(
  "/:id/nav",
  updatefundnav
);

router.post(
  "/buy",
  buyFund
);

export default router;