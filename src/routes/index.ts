import { Router } from 'express';
import appointmentRoute from './appointment.routes';
import userRoute from './user.routes';

const routes = Router();
routes.use('/appointment', appointmentRoute);
routes.use('/user', userRoute);

export default routes;
