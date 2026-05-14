import jwt, {
  JwtPayload,
} from "jsonwebtoken";

const secret = "niuyfddfgmn";

export type TokenPayload = {
  id: string;
  role: string;
};

function signJwt(
  payload: TokenPayload
): string | undefined {

  try {

    const token = jwt.sign(
      payload,
      secret,
      {
        expiresIn: "25m",
      }
    );

    return token;

  } catch (error) {

    console.log(error);

    return undefined;
  }
}

function verifyJWT(
  token: string
): string | JwtPayload | undefined {

  try {

    const payload = jwt.verify(
      token,
      secret
    );

    return payload;

  } catch (error) {

    console.log(error);

    return undefined;
  }
}

export {
  signJwt,
  verifyJWT,
};