import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';

import ListProviderAppoinmentsService from './ListProviderAppoinmentsService';

let listProviderAppoinments: ListProviderAppoinmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppoinmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppoinments = new ListProviderAppoinmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointmnet1 = await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: '11',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointmnet2 = await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: '11',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appoinments = await listProviderAppoinments.execute({
      provider_id: '1',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(appoinments).toEqual([appointmnet1, appointmnet2]);
  });
});
