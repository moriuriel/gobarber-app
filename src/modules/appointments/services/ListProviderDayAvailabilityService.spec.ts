import AppError from '@shared/Errors/AppError';
import ListProviderDayAvailablityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailablity: ListProviderDayAvailablityService;

describe('ListProviderDayAvailablity', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailablity = new ListProviderDayAvailablityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be albe to list the day avalibility from provider', async () => {
    await fakeAppointmentsRepository.create({
      user_id: '1234',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '1234',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailablity.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
