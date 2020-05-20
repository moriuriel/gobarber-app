import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const chaceKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      chaceKey,
    );
    console.log(appointments);
    if (!appointments) {
      appointments = await this.appointmentsRespository.findAllInDayFromProvider(
        {
          provider_id,
          month,
          year,
          day,
        },
      );

      await this.cacheProvider.save(chaceKey, appointments);
    }
    return appointments;
  }
}

export default ListProviderAppointmentsService;
