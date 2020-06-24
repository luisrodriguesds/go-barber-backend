import { Router } from 'express';
import appointmentRoute from './appointment.routes';

const routes = Router();
routes.use('/appointment', appointmentRoute);

export default routes;
