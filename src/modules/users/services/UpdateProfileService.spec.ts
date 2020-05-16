import AppError from '@shared/Errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be albe to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Doe 2',
      email: 'johndoe@email.com',
    });
    expect(updatedUser.name).toBe('Jhon Doe 2');
    expect(updatedUser.email).toBe('johndoe@email.com');
  });

  it('should not be albe to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'id',
        name: 'Jhon Doe2',
        email: 'john@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be albe to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'john@email.com',
      password: '123',
    });

    const user = await fakeUserRepository.create({
      name: 'Jhon Doe2',
      email: 'test@email.com.br',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe2',
        email: 'john@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be albe to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '12345',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Doe 2',
      email: 'johndoe@email.com',
      oldPassword: '12345',
      password: '1234',
    });
    expect(updatedUser.password).toBe('1234');
  });

  it('should be albe to update the password with out old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '12345',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe 2',
        email: 'johndoe@email.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be albe to update the password with worng old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe 2',
        email: 'johndoe@email.com',
        oldPassword: '1234567',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
