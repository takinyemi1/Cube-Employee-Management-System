import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addRequest, getRequests } from '../controllers/requestController.js'

const router = express.Router()

router.post('/add', authMiddleware, addRequest)
router.get('/:id', authMiddleware, getRequests)

export default router