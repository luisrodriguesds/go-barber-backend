import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw Error('Email já existe');
    }

    const user = usersRepository.create({
      name,
      password,
      email,
    });
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;