import AppError from '@shared/Errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be albe to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    const profile = await showProfile.execute(user.id);

    expect(profile.name).toBe('Jhon Doe');
    expect(profile.email).toBe('john@email.com.br');
  });

  it('should not be albe to show the profile from non-existing user', async () => {
    await expect(showProfile.execute('id')).rejects.toBeInstanceOf(AppError);
  });
});
