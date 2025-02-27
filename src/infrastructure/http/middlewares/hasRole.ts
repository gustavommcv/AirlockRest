import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  username: string;
  role: string;
}

declare module "express" {
  interface Request {
    user?: UserPayload;
  }
}

export default function hasRole(requiredRole: string) {
  return (request: Request, response: Response, next: NextFunction) => {
    const token = request.cookies.jwtToken;

    if (!token) {
      response.status(401).json({ message: "Unauthorized" });
      return;
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: jwt.VerifyErrors | null, decoded: unknown) => {
        if (err) {
          response.status(403).json({ message: "Forbidden" });
          return;
        }

        const user = decoded as UserPayload;

        if (user.role !== requiredRole) {
          response.status(403).json({
            message: `Role (${requiredRole}) required`,
            userRole: user.role,
          });
          return;
        }

        request.user = user;

        next();
      }
    );
  };
}
