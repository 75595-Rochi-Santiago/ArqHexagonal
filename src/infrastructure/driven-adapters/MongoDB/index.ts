import mongoose from 'mongoose'
import { Config } from '../../driving-adapters/config/env/index'

export class MongoDB {
  async connectDB (): Promise<void> {
    const config = new Config()
    try {
      const db = await mongoose.connect(config.DB.MONGODB ?? 'insert localdb')
      console.log(
        'database is connected to',
        db.connection.db.databaseName
      )
    } catch (error) {
      console.log(error)
    }
  }
}
