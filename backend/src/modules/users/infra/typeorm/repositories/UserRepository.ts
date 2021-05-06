import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

// Models
import User from '../entities/User';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByID(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findByDate(date: Date): Promise<User | undefined> {
    const findAppointments = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointments;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create(userData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UserRepository;
