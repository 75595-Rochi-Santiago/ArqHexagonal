import { Router } from 'express'
import {
  createUserController
} from '../controllers/index'

const route = Router()

// route.get('', getAllUsersController)
route.post('', createUserController)
// route.put('/:id', updateUserController)
// route.delete('/:id', deleteUserController)

export default route
