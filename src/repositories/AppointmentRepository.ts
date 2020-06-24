import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// DTO - Data Transfere Object
// Enviar obj por parâmetro fica bem melhor

interface AppointmentCreateDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public create({ provider, date }: AppointmentCreateDTO): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
