import { Router } from 'express';

import ProvidersController from '../controllers/ProvidersController';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerAppointments = new ProviderAppointmentsController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:id/month', providerMonthAvailabilityController.index);
providersRouter.get('/:id/day', providerDayAvailabilityController.index);
providersRouter.get('/appointments', providerAppointments.index);

export default providersRouter;
