import { services } from '../data/beautyServices.js'

const createService = async (req, res) =>{
    console.log('Desde CreateService')
}

const getServices = (req, res)=>{
    res.json(services)
}

export{
    createService,
    getServices
}