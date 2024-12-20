import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/token/validateToken";

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Authorization } = req.cookies;
  // console.log(Authorization);
  if (!Authorization) {
    res.status(401).json({
      message: "You are not signed in",
    });
    return;
  }

  const decoded = validateToken(Authorization);
  req.userId = decoded.id;
  next();
};

export const isApikeyAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];
  console.log("debug log 0 - user.ts", apiKey);
  console.log("debug log 1 - user.ts", process.env.X_API_KEY);
  const apiKeyAccepted = apiKey === process.env.X_API_KEY;
  if (!apiKeyAccepted) {
    res.status(403).json({
      message: "You are not authorized to do this",
    });
    return;
  }
  next();
};
