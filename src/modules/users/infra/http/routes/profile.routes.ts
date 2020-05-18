import { Router } from 'express';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';
import { celebrate, Segments, Joi } from 'celebrate';
const profileController = new ProfileController();

const prfileRouter = Router();

prfileRouter.use(ensureAuthenticated);
prfileRouter.put('/', profileController.update);
prfileRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.show,
);

export default prfileRouter;
