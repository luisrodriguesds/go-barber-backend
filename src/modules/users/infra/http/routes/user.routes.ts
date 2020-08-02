import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserServer';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userRoute = Router();
const upload = multer(uploadConfig);
userRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    return response.json(user);
  },
);

userRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    return response.json(user);
  },
);

export default userRoute;
