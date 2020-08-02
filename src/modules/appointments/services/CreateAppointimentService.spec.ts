import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import CreateAppointimentService from './CreateAppointimentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointiment: CreateAppointimentService;

describe('CreateAppointimentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointiment = new CreateAppointimentService(
      fakeAppointmentsRepository,
    );
  });

  it('Sholud be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointiment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '123456',
      user_id: '111',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
    expect(appointment).toHaveProperty('date');
  });

  it('Sholud not be able to create two appointment on the same time', async () => {
    const date = new Date();

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await createAppointiment.execute({
      date,
      provider_id: '123456',
      user_id: '111',
    });

    await expect(
      createAppointiment.execute({
        date,
        provider_id: '123457',
        user_id: '111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Sholud not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointiment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '123457',
        user_id: '111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Sholud not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointiment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '123457',
        user_id: '111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Sholud not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointiment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '111',
        user_id: '111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Sholud not be able to create an appointment outside 8am and 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointiment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: '123',
        user_id: '111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
