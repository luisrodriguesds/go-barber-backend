import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRoute = Router();
const providerAppointmentsController = new ProviderAppointmentsController();
const appointmentsController = new AppointmentsController();

appointmentRoute.use(ensureAuthenticated);

appointmentRoute.post('/', appointmentsController.create);
appointmentRoute.get('/me', providerAppointmentsController.index);

export default appointmentRoute;
