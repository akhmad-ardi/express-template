import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// validation
import ValidationError from '../validation/ValidationError';

class AuthMiddleware {
  public Authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const { token_user } = req.cookies;
      if (!token_user) throw new ValidationError(403, 'Kamu Belum Terautentikasi');

      const decode = jwt.verify(token_user, process.env.PUBLIC_KEY as string);
    } catch (error) {}
  }
}

export default new AuthMiddleware();
