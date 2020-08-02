import { Router } from 'express';
import sessionRoute from '@modules/users/infra/http/routes/session.routes';
import appointmentRoute from '@modules/appointments/infra/http/routes/appointment.routes';
import providerRoute from '@modules/appointments/infra/http/routes/providers.routes';
import userRoute from '@modules/users/infra/http/routes/user.routes';
import profileRoute from '@modules/users/infra/http/routes/profile.routes';
import passwordRoute from '@modules/users/infra/http/routes/password.routes';

const routes = Router();
routes.use('/appointment', appointmentRoute);
routes.use('/provider', providerRoute);
routes.use('/user', userRoute);
routes.use('/session', sessionRoute);
routes.use('/password', passwordRoute);
routes.use('/profile', profileRoute);

export default routes;
