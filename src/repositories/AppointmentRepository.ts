import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );

    // Como estou extendendo essa class a class repository, consigo acessar esses métodos
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentRepository;
