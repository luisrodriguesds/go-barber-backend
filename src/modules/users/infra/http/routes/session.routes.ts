import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { celebrate, Segments, Joi } from 'celebrate';

const sessionRoute = Router();

sessionRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });
    delete user.password;
    return response.json({ user, token });
  },
);

export default sessionRoute;
