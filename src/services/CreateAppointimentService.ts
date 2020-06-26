import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';
import AppError from '../errors/AppError';

/**
 * [] receive the inforation
 * [] Handle the errors/exceptions
 * [] Access to the repository
 */

interface Request {
  provider_id: string;
  date: Date;
}

/**
 * Dependency Inversion - SOLID (Receber as instancias por parâmetro do constructor)
 * SOLID
 * - Single Responsabiliry Principle (Dividir as responsabilidares)
 * - Dependency Inversion Principle ( Buscar dados de um único repositorio)
 */

class CreateAppointimentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    // Somente cria instância
    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // Commita no banco
    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointimentService;
