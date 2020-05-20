import AppError from '@shared/Errors/AppError';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentsService';

let fakeAppointmentsRepositroy: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentsService;
let fakeNotificationsRepository: FakeNotificationRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CrateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepositroy = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentsService(
      fakeAppointmentsRepositroy,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      user_id: '1234',
      date: new Date(2020, 4, 10, 13),
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 5, 10, 11);

    await createAppointment.execute({
      user_id: '1234',
      date: appointmentDate,
      provider_id: '123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123',
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able  to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 20).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '123',
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able  to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: '123',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able  to create an appointment outside the available hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: '123',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: '123',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
