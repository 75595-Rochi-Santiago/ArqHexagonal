
export class Config {
  public readonly JWT
  public readonly PORT
  public readonly DB
  constructor () {
    this.JWT = { KEY: process.env.JWT_KEY }
    this.PORT = process.env.PORT
    this.DB = { MONGODB: process.env.MONGO_CONNECT }
  }
}
