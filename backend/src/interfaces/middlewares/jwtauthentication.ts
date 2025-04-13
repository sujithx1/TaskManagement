    import { Request, Response, NextFunction } from 'express';
    import { Jwtuser } from '../../configs/jwt';
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET||""; // use .env
    import jwt from "jsonwebtoken"
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
      
    export const authorizeRoles = (...roles: string[]) => {
    return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Insufficient role access' });
        }
        next();
    };
    };
