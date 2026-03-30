import express from 'express'
import colors from 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'
import AuthRoutes from './routes/authRoutes.js'

//variables de entorno
dotenv.config()

// Configurar la pp
const app = express()

//leer datos via body
app.use(express.json())

//conectar a la base de datos
db()

//Configurar cors
const whiteList =  [process.env.FRONTEND_URL, undefined]

const corsOptions = {
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            //permitir la conexion
            callback(null,true)
        }else{
            //No permitir la conexion
            callback(new Error('Error de cors'))
        }
    }
}

app.use(cors(corsOptions))
// Definir una ruta usando req=request y res=response
// enviar respuestas tipo json
app.use('/api/services', servicesRoutes)
app.use('/api/auth', AuthRoutes)

// Definir puerto
const PORT = process.env.PORT || 4000

// Arrancar la app
app.listen(PORT, () =>{
    console.log(colors.blue.bgMagenta.bold('El servidor se esta ejecutando en el puerto:'), PORT)
})