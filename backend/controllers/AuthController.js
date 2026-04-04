import User from "../Models/User.js"
import { sendEmailVerification } from "../emails/authEmailService.js"
import { generateJWT } from "../utils/index.js"
import { uniqueId } from "../utils/index.js"

const register = async (req,res) =>{
    //Valida todos los campos
    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({msg: error.message})
    }

    const {email, password, name} = req.body

    // Evitar registros duplicados
    const userExists = await User.findOne({email})
    if(userExists){
        const error = new Error('El usuario ya se encuentra registrado')
        return res.status(400).json({msg: error.message})
    }

    // Validar la extension de password
    const MIN_PASSWORD_LENGTH = 8
    if(password.trim().length < MIN_PASSWORD_LENGTH){
        const error = new Error(`El password debe tener como minimo ${MIN_PASSWORD_LENGTH} caracteres`)
        return res.status(400).json({msg: error.message})
    }

    try {
        const user = new User(req.body)
        const result = await user.save()

        const {name,email,token} = result

        sendEmailVerification({
            name,
            email,
            token
        })
        res.json({msg: 'El usuario se creo correctamente, revita tu email'})
    } catch (error) {
        console.log(error)
    }
}

const verifyAccount = async (req,res) =>{
    const {token} = req.params

    const user = await User.findOne({token})
    if(!user){
        const error = new Error('Hubo un error, el token no es valido')
        return res.status(401).json({msg: error.message})
    }

    //Si el token es valido, confirmar la cuenta
    try {
        user.verified=true
        user.token=''
        await user.save()
        res.json({
            msg: 'Usuario Confirmado Correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req,res) =>{    
    const {email, password} = req.body

    //Revisar que el usuario exista
    const user = await User.findOne({email})
    if(!user){
        const error = new Error('El usuario no existe')
        return res.status(401).json({msg:error.message})
    }

    // Revisar si el usuario confirmo su cuenta
    if(!user.verified){
        const error = new Error('Tu cuenta no ha sido confirmada aun')
        return res.status(401).json({msg:error.message})
    }

    //comprobar el password
    if(await user.checkPassword(password)){
        const token = generateJWT(user._id)
        
        res.json({
            token
        })
    }else{
        const error = new Error('El password es incorrecto')
        return res.status(401).json({msg:error.message})
    }
}   

const forgotPassword = async (req,res) =>{
    const {email} = req.body

    //Comprobar si existe el usuario
    const user = await User.findOne({email})
    if(!user){
        const error = new Error('El usuario no existe')
        return res.status(404).json({msg:error.message})
    }

    try {
        user.token = uniqueId()
        await user.save()

        res.json({
            msg: 'Hemos enviado un email con las instrucciones'
        })
    } catch (error) {
        console.log(error)
    }
}

const user = async (req, res) => {
    const {user} = req
    res.json({user})
}

export {
    register,
    verifyAccount,
    login,
    forgotPassword,
    user
}