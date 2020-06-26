import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  /**
   * execute
   */
  public async execute({ email, password }: Request): Promise<{ user: User }> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw Error('Email ou senha incorreto(s)');
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw Error('Email ou senha incorreto(s)');
    }

    return { user };
  }
}
export default AuthenticateUserService;
