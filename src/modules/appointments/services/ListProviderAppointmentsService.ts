import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRespository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRespository: IAppointmentsRespository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRespository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    );
    return appointments;
  }
}

export default ListProviderAppointmentsService;
