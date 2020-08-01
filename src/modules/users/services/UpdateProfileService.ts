import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    password,
    old_password,
    email,
  }: Request): Promise<User> {
    const user = await this.usersRepository.finById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('Email já existente');
    }

    user.name = name;
    user.email = email;
    if (password && !old_password) {
      throw new AppError('Informe a senha antiga');
    }

    if (password && old_password) {
      const checkOldpass = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldpass) {
        throw new AppError('A senha antiga está errada');
      }
      user.password = await this.hashProvider.generateHash(password);
    }
    return this.usersRepository.save(user);
  }
}

export default UpdateUserProfileService;
