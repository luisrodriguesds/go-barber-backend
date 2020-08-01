import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserServer from './CreateUserServer';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserServer;
let authenticate: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserServer(fakeUserRepository, fakeHashProvider);

    authenticate = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('shold be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const response = await authenticate.execute({
      email: 'john@doe.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('shold not be able to authenticate with non existing user', async () => {
    await expect(
      authenticate.execute({
        email: 'john@doe.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold no be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Jhon Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await expect(
      authenticate.execute({
        email: 'john@doe.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
