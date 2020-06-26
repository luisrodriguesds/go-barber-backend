import { Router } from 'express';
import appointmentRoute from './appointment.routes';
import userRoute from './user.routes';
import sessionRoute from './session.routes';

const routes = Router();
routes.use('/appointment', appointmentRoute);
routes.use('/user', userRoute);
routes.use('/session', sessionRoute);

export default routes;
