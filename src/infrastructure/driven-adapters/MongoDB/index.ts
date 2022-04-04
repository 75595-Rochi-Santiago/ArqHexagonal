import mongoose from 'mongoose'

export class MongoDB {
  async connectDB (): Promise<void> {
    try {
      const db = await mongoose.connect(
        'mongodb+srv://conexa:96lszHMt9So8GPWU@cluster0.yjpvu.mongodb.net/test'
      )
      console.log(
        'database is connected to',
        db.connection.db.databaseName
      )
    } catch (error) {
      console.log(error)
    }
  }
}
