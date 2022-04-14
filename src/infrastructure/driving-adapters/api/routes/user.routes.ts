import { Router } from 'express'
import {
  createUserController,
  getAllUsersController,
  deleteUserController,
  updateUserController
} from '../controllers/index'

const route = Router()

route.get('', getAllUsersController)
route.post('', createUserController)
route.put('', updateUserController)
route.delete('/:id', deleteUserController)

export default route
