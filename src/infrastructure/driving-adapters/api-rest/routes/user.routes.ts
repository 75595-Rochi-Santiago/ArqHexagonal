import { Router } from 'express'
import {
  createUserController,
  getAllUsersController
} from '../controllers/index'

const route = Router()

route.get('', getAllUsersController)
route.post('', createUserController)
// route.put('/:id', updateUserController)
// route.delete('/:id', deleteUserController)

export default route
