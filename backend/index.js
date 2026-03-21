import express from 'express'
import dotenv from 'dotenv'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'

//variables de entorno
dotenv.config()

// Configurar la pp
const app = express()

//conectar a la base de datos
db()

// Definir una ruta usando req=request y res=response
// enviar respuestas tipo json
app.use('/api/services', servicesRoutes)


// Definir puerto
const PORT = process.env.PORT || 4000

// Arrancar la app
app.listen(PORT, () =>{
    console.log('El servidor se esta ejecutando en el puerto:', PORT)
})

console.log(rocess.env.MONGO_URI)