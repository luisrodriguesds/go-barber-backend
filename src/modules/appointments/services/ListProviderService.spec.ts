import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import ListProviderService from './ListProviderService';

let fakeUserRepository: FakeUserRepository;
let listProvider: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProvider = new ListProviderService(fakeUserRepository);
  });

  it('should be able to list the provider', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John tre',
      email: 'john@tre.com',
      password: '123456',
    });

    const logged = await fakeUserRepository.create({
      name: 'John qua',
      email: 'john@qua.com',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: logged.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
