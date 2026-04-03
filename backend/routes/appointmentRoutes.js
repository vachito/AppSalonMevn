import express from 'express'
import { createAppointment, getAppointmentByDate, getAppointmentById } from '../controllers/AppointmentController.js'
import authMidleware from '../midleware/authMidleware.js'

const router = express.Router()

router.route('/')
    .post(authMidleware, createAppointment)
    .get(authMidleware, getAppointmentByDate)

router.route('/:id')
    .get(authMidleware, getAppointmentById)
export default router
