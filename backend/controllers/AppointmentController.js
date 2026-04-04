import Appointment from "../Models/Appointment.js";
import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
import { validateObjectId, handleNotFoundError, formatDate } from "../utils/index.js";
import { sendEmailNewAppointment, sendEmailUpdateAppointment, sendEmailCancelledAppointment } from "../emails/appointmentEmailService.js";

const createAppointment = async (req, res) => {
  const appointment = req.body;
  appointment.user = req.user._id.toString();

  try {
    const newAppointment = new Appointment(appointment);
    const result = await newAppointment.save();
    await sendEmailNewAppointment({
      date: formatDate(result.date),
      time:result.time
    })
    res.json({
      msg: "Tu reservacion se realizo correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const getAppointmentByDate = async (req, res) => {
  const { date } = req.query;

  const newDate = parse(date, "dd/MM/yyyy", new Date());

  if (!isValid(newDate)) {
    const error = new Error("Fecha no valida");
    return res.status(400).json({ msg: error.message });
  }

  const isoDate = formatISO(newDate);

  const appointments = await Appointment.find({
    date: {
      $gte: startOfDay(new Date(isoDate)),
      $lte: endOfDay(new Date(isoDate)),
    },
  }).select("time");

  res.json(appointments);
};

const getAppointmentById = async (req, res) => {
  const { id } = req.params;

  //validar por object id
  if (validateObjectId(id, res)) return;

  //validar que exista la cita
  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) {
    return handleNotFoundError("La cita no existe", res);
  }

  //validar que la cita pertenezca al usuario autenticado
  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permiso para ver esta cita");
    return res.status(403).json({ msg: error.message });
  }
  res.json(appointment);
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;

  //validar por object id
  if (validateObjectId(id, res)) return;

  //validar que exista la cita
  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) {
    return handleNotFoundError("La cita no existe", res);
  }

  //validar que la cita pertenezca al usuario autenticado
  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permiso para ver esta cita");
    return res.status(403).json({ msg: error.message });
  }

  const {date, time, totalAmount, services} = req.body

  appointment.date = date
  appointment.time = time
  appointment.totalAmount = totalAmount
  appointment.services = services

  try {
    const result = await appointment.save()
    await sendEmailUpdateAppointment({
      date: formatDate(result.date),
      time:result.time
    })
    res.json({
        msg: 'Cita actualizada correctamente'
    })
  } catch (error) {
    console.log(error)
  }
};

const deleteAppointment = async (req,res) => {
  const { id } = req.params;

  //validar por object id
  if (validateObjectId(id, res)) return;

  //validar que exista la cita
  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) {
    return handleNotFoundError("La cita no existe", res);
  }

  //validar que la cita pertenezca al usuario autenticado
  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permiso para ver esta cita");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await appointment.deleteOne()
    
    await sendEmailCancelledAppointment({
      date: formatDate(appointment.date),
      time:appointment.time
    })
    
    res.json({msg: 'Cita cancelada Correctamente'})
  } catch (error) {
    console.log(error)
  }
}

export {
  createAppointment,
  getAppointmentByDate,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
};
