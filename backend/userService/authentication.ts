import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}


const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies['token'];
  console.log('Token:', token); // Debugging line

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  jwt.verify(token, 'secret-token', (err: jwt.VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
    if (err) {
      console.log('JWT Error:', err); // Debugging line
      res.status(403).json({ message: 'Invalid token.' });
      return;
    }

    console.log('Decoded:', decoded); // Debugging line
    req.user = decoded;
    next();
  });
};


export default authenticateToken;
