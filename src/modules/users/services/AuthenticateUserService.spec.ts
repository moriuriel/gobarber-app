import AppError from '@shared/Errors/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be albe to authenticate', async () => {
    await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    const reponse = await authenticateUser.execute({
      email: 'john@email.com.br',
      password: '123',
    });

    expect(reponse).toHaveProperty('token');
  });

  it('should not be albe to authenticate with non existing user', async () => {
    expect(
      authenticateUser.execute({
        email: 'john@email.com.br',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be albe to authenticate with worng password', async () => {
    await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    expect(
      authenticateUser.execute({
        email: 'john@email.com.br',
        password: '123345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
