import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointimentService from '@modules/appointments/services/CreateAppointimentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRoute = Router();

appointmentRoute.use(ensureAuthenticated);

// appointmentRoute.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentRoute.post('/', async (request, response) => {
  const user_id = request.user.id;
  const { provider_id, date } = request.body;
  const parseDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointimentService);
  const appointment = await createAppointment.execute({
    provider_id,
    user_id,
    date: parseDate,
  });
  return response.json(appointment);
});

export default appointmentRoute;
