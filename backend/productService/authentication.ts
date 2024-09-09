import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  // Get the token from the cookie
  const token = req.cookies['token'];

  // If token is not present, respond with an error
  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  // Verify the token
  jwt.verify(token, 'secret-token', (err: jwt.VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token.' });
      return;
    }

    // Attach the decoded token to the request object
    req.user = decoded;
    next();
  });
};

export default authenticateToken;
