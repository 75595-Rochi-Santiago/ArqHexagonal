import { Router } from 'express'
import { JWTManager } from '../security/jwt-manager'
import {
  createUserController,
  getAllUsersController,
  deleteUserController,
  updateUserController
} from '../controllers/index'

const route = Router()

route.get('', [JWTManager.verifyToken], getAllUsersController)
route.post('', [JWTManager.verifyToken], createUserController)
route.put('', [JWTManager.verifyToken], updateUserController)
route.delete('/:id', [JWTManager.verifyToken], deleteUserController)

export default route
