import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointimentsRepository from '@modules/appointments/repositories/IAppointimentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface Request {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointimentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointimentsRepository,

    @inject('NotificationRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(
        'Você não pode riar um agendamento em uma data passada',
      );
    }

    if (user_id === provider_id) {
      throw new AppError('Você não pode criar uma agendamento com você mesmo');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('Fora do horário de serviço');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    // Somente cria instância
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento realizado para dia ${dateFormatted}`,
    });
    return appointment;
  }
}

export default CreateAppointimentService;
