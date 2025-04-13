import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userEntity } from '../domain/entities/userentity';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET||""; // use .env
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET||"";

export interface Jwtuser extends JwtPayload{
    id:string,
    role:string
}

export const generateAccessToken = (id:string,role:string): string => {
  return jwt.sign({id,role}, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (id:string,role:string): string => {
  return jwt.sign({id,role}, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};


export const createAccesstoken=(req:Request,res:Response,role:string)=>{
    const refreshWithRole = `${role}_refreshToken`;
    const refreshToken = req.cookies[refreshWithRole];
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token not found' });
    }
  
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: jwt.VerifyErrors | null, decoded:JwtPayload | string | undefined) => {
        if (err || !decoded) {
            return res.status(403).json({ message: 'Invalid Refresh Token' });
          }
        const user = decoded as Jwtuser;
  
        const { id, role } = user;
      const newAccessToken = generateAccessToken(id, role );
  
      res.json({ accessToken: newAccessToken });
    });
}