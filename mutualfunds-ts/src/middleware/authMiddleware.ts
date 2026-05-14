import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  verifyJWT,
} from "../utility/authManager";

type CustomRequest = Request & {
  user?: any;
};

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const token = req.headers.token as string;

    console.log(token);

    if (!token) {

      return res.status(401).json({
        error: "Token missing",
      });
    }

    const decoded = verifyJWT(token);

    if (!decoded) {

      return res.status(401).json({
        error: "Invalid token",
      });
    }

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};

export default authMiddleware;