import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { celebrate, Segments, Joi } from 'celebrate';

const forgotPasswordController = new ForgotPasswordController();
const restPasswordController = new ResetPasswordController();
const sessionsRouter = Router();

sessionsRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);
sessionsRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  restPasswordController.create,
);

export default sessionsRouter;
