import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';

import ListProviderDayAvailabiliry from './ListProviderDayAvailabiliry';

let listProviderDayAvailabiliry: ListProviderDayAvailabiliry;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProvidersAvailablitiry', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabiliry = new ListProviderDayAvailabiliry(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availablitiry from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: '11',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: '11',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });
    const availability = await listProviderDayAvailabiliry.execute({
      provider_id: '1',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ]),
    );
  });
});
