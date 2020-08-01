import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserServer';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should no be able to create a new user with same email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
