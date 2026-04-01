import jwt from 'jsonwebtoken'
import User from '../Models/User.js'

const authMidleware = async(req, res, next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select(
                "-password -verified -token -__v"
            )
            next()   
        } catch{
            const error = new Error('Token no valido')
            res.status(403).json({msg:error.message})    
        }
    }else{
        const error = new Error('Token no valido o onexistente')
        res.status(403).json({msg:error.message})
        return
    }
}

export default authMidleware