import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRoute = Router();
const providerAppointmentsController = new ProviderAppointmentsController();
const appointmentsController = new AppointmentsController();

appointmentRoute.use(ensureAuthenticated);

appointmentRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentRoute.get('/me', providerAppointmentsController.index);

export default appointmentRoute;
