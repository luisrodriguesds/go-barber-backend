import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';
import IAppointimentsRepository from '../repositories/IAppointimentsRepository';
// import User from '@modules/users/infra/typeorm/entities/User';
// import IUserRepository from '@modules/users/repositories/IUserRepository';

interface Request {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabitiry {
  constructor(
    @inject('AppointmentsRepository')
    private appointimentsRepository: IAppointimentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: Request): Promise<IResponse> {
    const appointments = await this.appointimentsRepository.findAllInMothFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (v, i) => i + 1,
    );

    const availabiliry = eachDayArray.map(day => {
      const appointimentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointimentsInDay.length < 10,
      };
    });

    return availabiliry;
  }
}

export default ListProviderMonthAvailabitiry;
