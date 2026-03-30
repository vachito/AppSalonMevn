import express from 'express'
import { register, verifyAccount } from '../controllers/AuthController.js'

const router =express.Router()

//Rutas de autenticacion y registro de usuarios
router.post('/register',register)
router.get('/verify/:token',verifyAccount)
export default router