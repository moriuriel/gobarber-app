import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/Errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
  user_id: string;
}

/**
 * Dependency Inversion(SOLID)
 */
@injectable()
class CreateAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appoitment on a past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appoitment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You cant create an appoitments between 8am and 5pm');
    }
    const findAppotimentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppotimentInSameDate) {
      throw new AppError('This appointment is aleready booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    return appointment;
  }
}

export default CreateAppointmentsService;
