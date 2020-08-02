import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';

import ListProviderMonthAvailabitiryService from './ListProviderMonthAvailabiliryService';

let listProviderMonthAvailabitiry: ListProviderMonthAvailabitiryService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProvidersAvailablitiry', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabitiry = new ListProviderMonthAvailabitiryService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availablitiry from provider', async () => {
    const arr = Array(10)
      .fill(null)
      .map((_, i) => i + 8);

    await Promise.all(
      arr.map(async hour => {
        await fakeAppointmentsRepository.create({
          provider_id: '1',
          user_id: '11',
          date: new Date(2020, 4, 20, hour, 0, 0),
        });
      }),
    );

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: '11',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabitiry.execute({
      provider_id: '1',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
