import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRespository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRespository: IAppointmentsRespository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRespository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        day,
        year,
      },
    );

    const hourStart = 8;

    const eachHouryArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const avalibility = eachHouryArray.map(hour => {
      const hasAppointmetnInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmetnInHour && isAfter(compareDate, currentDate),
      };
    });

    return avalibility;
  }
}

export default ListProviderDayAvailabilityService;
