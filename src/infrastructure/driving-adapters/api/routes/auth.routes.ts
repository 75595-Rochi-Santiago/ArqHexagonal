import { Router } from 'express'
import { signInAuthController } from '../controllers/index'

const route = Router()

route.post('', signInAuthController)

export default route
