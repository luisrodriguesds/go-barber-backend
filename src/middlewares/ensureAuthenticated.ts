import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw Error('JWT é inválido');
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub,
    };
    return next();
  } catch (error) {
    throw new AppError('JWT é inválido', 401);
  }
}
