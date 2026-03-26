import mongoose from 'mongoose'
import { services } from '../data/beautyServices.js'
import Service from '../Models/Service.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

const createService = async (req, res) =>{
    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg:error.message
        })
    }

    try {
        const dataService = new Service(req.body)
         await dataService.save()
        res.json({msg:'Se ha creado correctamente el servicio   '})
    } catch (error) {
        console.log(error)
    }
}

const getServices =async (req, res)=>{
    try {
        const services = await Service.find()
        res.json(services)
    } catch (error) {
        console.log(error.message)
    }
}

const getServiceById= async(req,res)=>{
    const {id} = req.params

    //validar el id
    if(validateObjectId(id, res)) return

    //validar que exista
    const serviceFind = await Service.findById(id)
    if(!serviceFind){
        return handleNotFoundError('El servicio no existe', res)
    }

    //mostrar el servicio
    res.json(serviceFind)
}

const updateSerice = async (req, res) =>{
    const {id} = req.params

    //validar el id
    if(validateObjectId(id, res)) return

    //validar que exista
    const serviceFind = await Service.findById(id)
    if(!serviceFind){
        return handleNotFoundError('El servicio no existe', res)
    }

    serviceFind.name = req.body.name || serviceFind.name
    serviceFind.price = req.body.price || serviceFind.price

    try {
        await serviceFind.save()
        res.json({
            msg:'El servicio se actualizo correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteSerice = async (req, res) =>{
    const {id} = req.params

    //validar el id
    if(validateObjectId(id, res)) return

    //validar que exista
    const serviceFind = await Service.findById(id)
    if(!serviceFind){
        return handleNotFoundError('El servicio no existe', res)
    }

    //Eliminar el servicio
    try {
        await serviceFind.deleteOne()
        res.json({
            msg: 'El servicio ha sido eliminado'
        })
    } catch (error) {
        console.log(error)
    }
}

export{
    createService,
    getServices,
    getServiceById,
    updateSerice,
    deleteSerice
}