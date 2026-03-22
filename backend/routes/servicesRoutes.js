import express from 'express'
import { createService, getServices, getServiceById, updateSerice, deleteSerice } from '../controllers/ServiceController.js'

const router = express.Router()

router.post('/', createService)
router.get('/', getServices)
router.get('/:id',getServiceById)
router.put('/:id',updateSerice)
router.delete('/:id',deleteSerice)
export default router