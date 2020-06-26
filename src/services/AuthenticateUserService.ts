import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  /**
   * execute
   */
  public async execute({
    email,
    password,
  }: Request): Promise<{ user: User; token: string }> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Email ou senha incorreto(s)', 401);
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError('Email ou senha incorreto(s)', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}
export default AuthenticateUserService;
