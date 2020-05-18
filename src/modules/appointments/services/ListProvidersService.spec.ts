import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProvider: ListProviderService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProvider = new ListProviderService(fakeUserRepository);
  });

  it('should be albe to list the provider', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Jhon Doe2',
      email: 'john2@email.com.br',
      password: '123',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    const providers = await listProvider.execute(loggedUser.id);

    expect(providers).toEqual([user1, user2]);
  });
});
