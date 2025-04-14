import { NextFunction, Request, Response } from "express";
import { Jwtuser } from "../../configs/jwt";
import jwt from "jsonwebtoken"
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET||"sujithaccess"; // use .env
export const authenticateAccessToken = (
    req: Request & { user?: Jwtuser },
    res: Response,
    next: NextFunction
  ): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      res.sendStatus(401);
      return;
    }
  
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
      req.user = user as Jwtuser;
      next();
    });
  };
  