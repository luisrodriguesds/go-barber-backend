import { Router } from 'express';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providerRoute = Router();
const providersController = new ProvidersController();
const providerDayAvailability = new ProviderDayAvailabilityController();
const providerMonthAvailability = new ProviderMonthAvailabilityController();
providerRoute.use(ensureAuthenticated);

providerRoute.get('/', providersController.index);
providerRoute.get(
  '/:provider_id/month-availability',
  providerMonthAvailability.index,
);
providerRoute.get(
  '/:provider_id/day-availability',
  providerDayAvailability.index,
);

export default providerRoute;
