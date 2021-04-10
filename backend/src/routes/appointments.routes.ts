import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

// Models
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date)
  );

  if (findAppointmentsInSameDate) {
    return res.status(400).json({ message: 'This appointment is alredy booked' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return res.json(appointment);
})

export default appointmentsRouter;
