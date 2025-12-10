import { jwtVerify, errors } from "jose";
import dotenv from "dotenv/config";
import AuthError from "../errors/AuthError.js";

export default async function authenticateAdminUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AuthError("No token found", 401);
  }
  const token = authHeader.split(" ")[1];

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const shit = await jwtVerify(token, secret);
    next();
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      throw new AuthError("Token expired", 401);
    }

    if (err instanceof errors.JWSInvalid) {
      throw new AuthError("Token invalid", 403);
    }

    if (err instanceof AuthError) {
      throw err;
    }

    throw new AuthError("Authentication failed", 500, err);
  }
}
