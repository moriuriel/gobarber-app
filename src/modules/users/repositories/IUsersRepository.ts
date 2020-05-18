import User from '../infra/typeorm/entities/User';
import ICreateUserDto from '../dtos/ICreateUserDto';
import IFindAllProviderDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findAllProviders(data: IFindAllProviderDTO): Promise<User[]>;
  findById(email: string): Promise<User | undefined>;
  create(data: ICreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
