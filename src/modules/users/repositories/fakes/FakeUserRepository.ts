import { uuid } from 'uuidv4';
import IUser from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../../infra/typeorm/entities/User';

class UserRepository implements IUser {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });
    this.users.push(user);
    return user;
  }

  public async finById(id: string): Promise<User | undefined> {
    const user = this.users.find(item => item.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(item => item.email === email);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(item => item.id === user.id);
    this.users[findIndex] = user;

    return this.users[findIndex];
  }

  public async findAllProvider({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;
    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }
    return users;
  }
}

export default UserRepository;
