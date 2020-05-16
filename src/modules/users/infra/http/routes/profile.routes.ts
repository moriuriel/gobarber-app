import { Router } from 'express';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';
const profileController = new ProfileController();

const prfileRouter = Router();

prfileRouter.use(ensureAuthenticated);
prfileRouter.put('/', profileController.update);
prfileRouter.get('/', profileController.show);

export default prfileRouter;
