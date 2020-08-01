import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update the avatar of user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      avatarFilename: 'avatar.jpg',
      user_id: user.id,
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update the avatar of user that not exists', async () => {
    await expect(
      updateUserAvatar.execute({
        avatarFilename: 'avatar.jpg',
        user_id: 'non-exist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete avatar that already exists and update', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      avatarFilename: 'avatar.jpg',
      user_id: user.id,
    });

    await updateUserAvatar.execute({
      avatarFilename: 'avatar2.jpg',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
