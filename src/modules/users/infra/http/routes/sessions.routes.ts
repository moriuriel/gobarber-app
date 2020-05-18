import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate, Segments, Joi } from 'celebrate';

const sessionsController = new SessionsController();
const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
