import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken'; 

declare module 'express' {
  interface Request {
    user?: JwtPayload | any; 
  }
}