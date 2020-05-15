import ResetPasswordService from './ResetPasswordService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

import AppError from '@shared/Errors/AppError';

let fakeUserRespository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRespository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUserRespository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUserRespository.create({
      name: 'Joe Doe',
      email: 'joedoe@email.com.br',
      password: '123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);
    const genareteHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '12345',
      token,
    });

    const updatedUser = await fakeUserRespository.findById(user.id);

    expect(genareteHash).toHaveBeenCalledWith('12345');
    expect(updatedUser?.password).toBe('12345');
  });

  it('should not be able to reset the password non-existing token', async () => {
    await expect(
      resetPassword.execute({ token: 'non-existing-token', password: '1234' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );
    await expect(
      resetPassword.execute({ token, password: '1234' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUserRespository.create({
      name: 'Joe Doe',
      email: 'joedoe@email.com.br',
      password: '123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '12345',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
