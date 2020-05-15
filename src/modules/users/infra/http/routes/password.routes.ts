import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const restPasswordController = new ResetPasswordController();
const sessionsRouter = Router();

sessionsRouter.post('/forgot', forgotPasswordController.create);
sessionsRouter.post('/reset', restPasswordController.create);

export default sessionsRouter;
