import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

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
      throw Error('Email ou senha incorreto(s)');
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw Error('Email ou senha incorreto(s)');
    }

    const token = sign({}, 'c1e53a632b4eecc1213d0240597ed231', {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user, token };
  }
}
export default AuthenticateUserService;
