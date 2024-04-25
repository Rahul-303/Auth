import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET: string | undefined = process.env.JWT_SECRET;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  jwt.verify(authHeader || "", SECRET || "", (err, user) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (token) {
      jwt.verify(token, SECRET || "", (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        if (!user) {
          return res.sendStatus(403);
        }

        if (typeof user === "string") {
          return res.sendStatus(403);
        }

        req.headers["userId"] = user.id;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  });
};
