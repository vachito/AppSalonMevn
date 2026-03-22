import express from 'express'
import { createService, getServices } from '../controllers/ServiceController.js'

const router = express.Router()

router.post('/', createService)
router.get('/', getServices)


export default router