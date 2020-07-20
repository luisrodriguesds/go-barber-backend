import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserServer from './CreateUserServer';

describe('AuthenticateUser', () => {
  it('shold be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserServer(
      fakeUserRepository,
      fakeHashProvider,
    );
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'john@doe.com',
      password: '123456',
    });
    const authenticate = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const response = await authenticate.execute({
      email: 'john@doe.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('shold not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticate = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticate.execute({
        email: 'john@doe.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold no be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserServer(
      fakeUserRepository,
      fakeHashProvider,
    );
    await createUser.execute({
      name: 'Jhon Doe',
      email: 'john@doe.com',
      password: '123456',
    });
    const authenticate = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticate.execute({
        email: 'john@doe.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
