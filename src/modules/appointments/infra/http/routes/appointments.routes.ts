import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepositroy = getCustomRepository(AppointmentsRepository);

  const appontiments = await appointmentsRepositroy.find();

  return response.json(appontiments);
}); */

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = container.resolve(CreateAppointmentService);

  const appointment = await createAppointmentService.execute({
    date: parsedDate,
    provider_id,
  });

  return response.status(201).json(appointment);
});

export default appointmentsRouter;
