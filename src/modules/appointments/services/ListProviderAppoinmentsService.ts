import { injectable, inject } from 'tsyringe';
// import { getDaysInMonth, getDate } from 'date-fns';
import IAppointimentsRepository from '../repositories/IAppointimentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
// import User from '@modules/users/infra/typeorm/entities/User';
// import IUserRepository from '@modules/users/repositories/IUserRepository';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppoinmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointimentsRepository: IAppointimentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: Request): Promise<Appointment[]> {
    const appointments = await this.appointimentsRepository.findAllInDayFromProvider(
      {
        day,
        month,
        year,
        provider_id,
      },
    );

    return appointments;
  }
}

export default ListProviderAppoinmentsService;
