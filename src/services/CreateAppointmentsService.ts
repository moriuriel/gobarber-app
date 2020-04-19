import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../Errors/AppError';

interface RequestDto {
  provider_id: string;
  date: Date;
}

/**
 * Dependency Inversion(SOLID)
 */
class CreateAppointmentsService {
  public async execute({
    provider_id,
    date,
  }: RequestDto): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppotimentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppotimentInSameDate) {
      throw new AppError('This appointment is aleready booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentsService;
