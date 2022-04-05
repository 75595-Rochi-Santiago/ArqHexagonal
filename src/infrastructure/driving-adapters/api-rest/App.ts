import { MongoDB } from '../../../infrastructure/driven-adapters/MongoDB'
import { Server } from './Server'

export class App {
  server?: Server

  async start (): Promise<void> {
    const port: string = process.env.PORT ?? '8080'
    this.server = new Server(port)
    const db = new MongoDB()
    await db.connectDB()
    return await this.server.listen()
  }

  async stop (): Promise<void> {
    return await this.server?.stop()
  }
}
