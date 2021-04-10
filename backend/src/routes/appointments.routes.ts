import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

// Repository
import AppointmentRepository from '../repositories/AppointmentRepository';

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentRepository();

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appointmentRepository.findByDate(parsedDate);

  if (findAppointmentsInSameDate) {
    return res.status(400).json({ message: 'This appointment is alredy booked' });
  }

  const appointment = appointmentRepository.create(provider, parsedDate);

  return res.json(appointment);
})

export default appointmentsRouter;
