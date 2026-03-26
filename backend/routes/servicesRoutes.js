import express from 'express'
import { createService, getServices, getServiceById, updateSerice, deleteSerice } from '../controllers/ServiceController.js'

const router = express.Router()

router.route('/')
    .post(createService)
    .get(getServices)
    
router.route('/:id')
    .get(getServiceById)
    .put(updateSerice)
    .delete(deleteSerice)

export default router