import { Router } from 'express';

import AppointmentsController from '../controllers/AppointsmentController';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepositroy = getCustomRepository(AppointmentsRepository);

  const appontiments = await appointmentsRepositroy.find();

  return response.json(appontiments);
}); */

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
