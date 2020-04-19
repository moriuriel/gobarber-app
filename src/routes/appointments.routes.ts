import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentsService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  const appointmentsRepositroy = getCustomRepository(AppointmentsRepository);
  const appontiments = await appointmentsRepositroy.find();

  return response.json(appontiments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({
    date: parsedDate,
    provider_id,
  });

  return response.status(201).json(appointment);
});

export default appointmentsRouter;
