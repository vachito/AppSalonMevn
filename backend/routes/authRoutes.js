import express from 'express'
import { register, verifyAccount, login, user } from '../controllers/AuthController.js'
import authMidleware from '../midleware/authMidleware.js'

const router =express.Router()

//Rutas de autenticacion y registro de usuarios
router.post('/register',register)
router.get('/verify/:token',verifyAccount)
router.post('/login',login)

//Area privada - Requiere un JWT
router.get('/user',authMidleware, user)

export default router