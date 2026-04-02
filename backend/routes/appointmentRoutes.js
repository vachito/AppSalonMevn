import express from 'express'
import { createAppointment, getAppointmentByDate } from '../controllers/AppointmentController.js'
import authMidleware from '../midleware/authMidleware.js'

const router = express.Router()

router.route('/')
    .post(authMidleware, createAppointment)
    .get(authMidleware, getAppointmentByDate)

export default router
