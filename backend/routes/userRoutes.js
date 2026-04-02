import express from 'express'
import authMidleware from '../midleware/authMidleware.js'
import { getUserAppointments } from '../controllers/UserController.js'
const router = express.Router()

router.route('/:user/appointments')
    .get(authMidleware, getUserAppointments)

export default router