import { getRepository, Repository } from 'typeorm';
import IAppointment from '@modules/appointments/repositories/IAppointimentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
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

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appontment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appontment);

    return appontment;
  }
}

export default AppointmentRepository;
