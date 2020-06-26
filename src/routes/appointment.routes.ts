import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointimentService from '../services/CreateAppointimentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRoute = Router();

appointmentRoute.use(ensureAuthenticated);

appointmentRoute.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

appointmentRoute.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parseDate = parseISO(date);

  const createAppointment = new CreateAppointimentService();
  const appointment = await createAppointment.execute({
    provider_id,
    date: parseDate,
  });
  return response.json(appointment);
});

export default appointmentRoute;
