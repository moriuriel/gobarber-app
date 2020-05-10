import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';
import IAppointmentsRespository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRespository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
