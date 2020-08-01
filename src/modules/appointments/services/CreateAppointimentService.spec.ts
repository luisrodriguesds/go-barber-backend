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
    const appointment = await createAppointiment.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
    expect(appointment).toHaveProperty('date');
  });

  it('Sholud not be able to create two appointment on the same time', async () => {
    const date = new Date(2020, 4, 10, 11);
    await createAppointiment.execute({
      date,
      provider_id: '123456',
    });

    expect(
      createAppointiment.execute({
        date,
        provider_id: '123457',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
