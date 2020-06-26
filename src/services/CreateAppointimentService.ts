import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';
/**
 * [] receive the inforation
 * [] Handle the errors/exceptions
 * [] Access to the repository
 */

interface Request {
  provider: string;
  date: Date;
}

/**
 * Dependency Inversion - SOLID (Receber as instancias por parâmetro do constructor)
 * SOLID
 * - Single Responsabiliry Principle (Dividir as responsabilidares)
 * - Dependency Inversion Principle ( Buscar dados de um único repositorio)
 */

class CreateAppointimentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    // Somente cria instância
    const appointment = appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    // Commita no banco
    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointimentService;
