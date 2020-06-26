import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointimentService from '../services/CreateAppointimentService';

const appointmentRoute = Router();

appointmentRoute.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

appointmentRoute.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointimentService();
    const appointment = await createAppointment.execute({
      provider_id,
      date: parseDate,
    });
    console.log(appointment);
    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentRoute;
