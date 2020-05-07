import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/Errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRespository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

/**
 * Dependency Inversion(SOLID)
 */
@injectable()
class CreateAppointmentsService {
  constructor(
    @inject('AppointmentsRespository')
    private appointmentsRepository: IAppointmentsRespository,
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppotimentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppotimentInSameDate) {
      throw new AppError('This appointment is aleready booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentsService;
