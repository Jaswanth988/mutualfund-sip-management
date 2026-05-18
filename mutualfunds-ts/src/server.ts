import express, {
  Request,
  Response,
} from "express";

import cors from "cors";

import client from "./utility/pgManager";

import portfolioRoutes from "./routes/portfolioRoutes";

import investorRoute from "./routes/investorRoute";

import sipRoute from "./routes/sipRoute";

import fundsRoute from "./routes/sipRoute";

import { connectRedis } from "./redis";

require("../middleware/Telemetry");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello");
});

app.use("/api/investor", investorRoute);

app.use("/api/sip", sipRoute);

app.use("/api/funds", fundsRoute);

app.use(
  "/api/portfolio",
  portfolioRoutes
);

type CreateInvestorBody = {
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

app.post(
  "/api/investor/create",
  async (
    request: Request,
    response: Response
  ) => {

    const {
      investor_id,
      first_name,
      middle_name,
      last_name,
      pancard_no,
      adhaar_no,
      date_of_birth,
      gender,
      occupation,
      password,
    } = request.body as CreateInvestorBody;

    try {

      const value = await client.query(
        `
        SELECT add_investor(
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10
        );
        `,
        [
          investor_id,
          first_name,
          middle_name,
          last_name,
          pancard_no,
          adhaar_no,
          date_of_birth,
          gender,
          occupation,
          password,
        ]
      );

      console.log(JSON.stringify(value));

      return response.send(value);

    } catch (error) {

      console.error(`Error ${error}`);

      return response.status(500).json({
        error: "Server Error",
      });
    }
  }
);

// connectRedis();

app.listen(4000, () => {
  console.log("SERVER started");
});
