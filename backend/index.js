const express = require('express')

// Configurar la pp
const app = express()

// Definir una ruta usando req=request y res=response
// enviar respuestas tipo json
app.get('/', (req, res)=>{
    const product = [
        {
            id:1,
            price:30,
            name:'laptop'
        },
        {
            id:2,
            price:50,
            name:'monitor'
        },
    ]
    res.json(product)
})


// Definir puerto
const PORT = process.env.PORT || 4000

// Arrancar la app
app.listen(PORT, () =>{
    console.log('El servidor se esta ejecutando en el puerto:', PORT)
})