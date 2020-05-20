import AppError from '@shared/Errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUsers: CreateUsersService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUsers = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be albe to create a new user', async () => {
    const user = await createUsers.execute({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be albe to create a new user with same email from another', async () => {
    await createUsers.execute({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    expect(
      createUsers.execute({
        name: 'Jhon Doe',
        email: 'john@email.com.br',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
