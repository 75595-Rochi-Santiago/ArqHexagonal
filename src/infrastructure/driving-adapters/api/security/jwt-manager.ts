import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Config } from '../../config/env/index'

export class JWTManager {
  static async generateJWT (uid: string): Promise<any> {
    const config = new Config()

    console.log(config.JWT.KEY)
    console.log(uid)
    return await new Promise((resolve, reject) => {
      if (config.JWT.KEY !== undefined) {
        const payload = { uid }
        jwt.sign(
          payload,
          config.JWT.KEY,
          {
            expiresIn: '1h'
          },
          (err, token) => {
            if (err != null) {
              reject(err)
            } else {
              resolve(token)
            }
          }
        )
      }
    })
  }

  static async verifyToken (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const config = new Config()
    const token = req.header('x-token')
    if (token !== null && token !== undefined && config.JWT.KEY !== undefined) {
      try {
        const use = jwt.verify(token, config.JWT.KEY)
        console.log('->>>>>>>>>>', use)

        next()
      } catch (error) {
        console.log(error)
        res.status(401).json({
          name: 'UnauthorizedError',
          type: 'Token not valid'
        })
      }
    } else {
      return res.status(401).json({
        name: 'RequiredParameterError',
        type: 'There is no token in the request'
      })
    }
  }
}
