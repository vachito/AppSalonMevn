import express from 'express'
import { register, verifyAccount, login,forgotPassword, user,admin, verifyPasswordResetToken, updatePassword } from '../controllers/AuthController.js'
import authMidleware from '../midleware/authMidleware.js'

const router =express.Router()

//Rutas de autenticacion y registro de usuarios
router.post('/register',register)
router.get('/verify/:token',verifyAccount)
router.post('/login',login)
router.post('/forgot-password',forgotPassword)

router.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword)

//Area privada - Requiere un JWT
router.get('/user',authMidleware, user)
router.get('/admin',authMidleware, admin)

export default router