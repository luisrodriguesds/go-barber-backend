import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRoute = Router();
const profileController = new ProfileController();
profileRoute.use(ensureAuthenticated);
profileRoute.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);
profileRoute.get('/', profileController.show);

export default profileRoute;
