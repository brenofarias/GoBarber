import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

// Models
import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentRepository
  extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointments = await this.findOne({
      where: { date },
    });

    return findAppointments;
  }
}

export default AppointmentRepository;
