import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import { celebrate, Segments, Joi } from 'celebrate';

const userAvatarController = new UserAvatarController();
const usersController = new UsersController();

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
