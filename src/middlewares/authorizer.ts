import { Response, Request, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as string
    );

    // jwt.sign(decoded, process.env.TOKEN_SECRET as string);

    next();
  } catch (err) {
    res.status(401);
    return;
  }
};

export default auth;
