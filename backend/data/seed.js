import dotenv from 'dotenv'
import {db} from '../config/db.js'
import colors from 'colors'
import Service from '../Models/Service.js'
import { services } from '../data/beautyServices.js'

dotenv.config()
await db()

async function seedDB(){
    try {
        await Service.insertMany(services)
        console.log(colors.green.bold('Se agregaron los datos correctamente'))
        process.exit()
    } catch (error) {
        console.log(error)   
        process.exit(1)
    }
}

async function clearDB(){
    try {
        await Service.deleteMany()
        console.log(colors.red.bold('Los servicios ha sido eliminados'))
        process.exit()
    } catch (error) {
        console.log(error)   
        process.exit(1)
    }
}

if(process.argv[2] === '--import')
{
    seedDB()
}else{
    clearDB()
}
