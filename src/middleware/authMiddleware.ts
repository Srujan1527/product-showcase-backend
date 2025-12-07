// src/auth/middleware.ts
import type { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY || "defaultsecret";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
    is_admin: boolean;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  // console.log("authHeader", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1] as string;
  console.log("token", token);
  try {
    console.log("VERIFY TOKEN", JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
      is_admin: boolean;
    };

    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  console.log("He is admin \n");
  next();
}
