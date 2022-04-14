import path from 'path'
import dotenv from 'dotenv'
import { App } from './App'

try {
  dotenv.config({ path: path.resolve(__dirname, '../../../../.env') })
  new App().start()
} catch (error) {
  console.log(error)
}
