import { getRepository, Repository, Raw } from 'typeorm';
import IAppointment from '@modules/appointments/repositories/IAppointimentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMothFromProviderDTO from '@modules/appointments/dtos/IFindAllInMothFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../entities/Appointment';

class AppointmentRepository implements IAppointment {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );

    // Como estou extendendo essa class a class repository, consigo acessar esses métodos
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMothFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMothFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `date_format(${dateFieldName}, '%m-%Y') = '${parseMonth}-${year}'`,
        ),
      },
    });
    // `to_char(${dateFieldName}, 'MM-YYY') = '${parseMonth}-${year}'`, no pg

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parseDay = String(day).padStart(2, '0');
    const parseMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `date_format(${dateFieldName}, '%d-%m-%Y') = '${parseDay}-${parseMonth}-${year}'`,
        ),
      },
    });
    // `to_char(${dateFieldName}, 'MM-YYY') = '${parseMonth}-${year}'`, no pg

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appontment = this.ormRepository.create({
      provider_id,
      date,
      user_id,
    });
    await this.ormRepository.save(appontment);

    return appontment;
  }
}

export default AppointmentRepository;
