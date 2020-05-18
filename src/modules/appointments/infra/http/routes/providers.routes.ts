import { Router } from 'express';

import ProvidersController from '../controllers/ProvidersController';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import { celebrate, Segments, Joi } from 'celebrate';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerAppointments = new ProviderAppointmentsController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:id/month',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:id/day',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index,
);
providersRouter.get('/appointments', providerAppointments.index);

export default providersRouter;
