import express from "express";

import {
  addsip,
  getsipbyid,
  sipprocess,
  getsiptranscations,
  getsiptranscationss,
} from "../controllers/sipController";

const router = express.Router();

router.get(
  "/transcations/:portfolioId",
  getsiptranscationss
);

router.post(
  "/addsip",
  addsip
);

router.get(
  "/:id",
  getsipbyid
);

router.post(
  "/:id/process",
  sipprocess
);

router.get(
  "/:id/transcations",
  getsiptranscations
);

export default router;