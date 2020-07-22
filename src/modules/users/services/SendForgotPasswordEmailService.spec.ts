import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmail from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmail;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john@doe.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover a not existing user passowrd', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'john@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold generate a forget password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john@doe.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
