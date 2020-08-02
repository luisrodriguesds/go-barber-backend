import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointimentsRepository from '../repositories/IAppointimentsRepository';
// import User from '@modules/users/infra/typeorm/entities/User';
// import IUserRepository from '@modules/users/repositories/IUserRepository';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabiliry {
  constructor(
    @inject('AppointmentsRepository')
    private appointimentsRepository: IAppointimentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: Request): Promise<IResponse> {
    const appointments = await this.appointimentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const hourStart = 8;
    const eachHourArray = Array.from({ length: 10 }, (_, i) => i + hourStart);
    const currentDate = new Date(Date.now());

    const availabiliry = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availabiliry;
  }
}

export default ListProviderDayAvailabiliry;
