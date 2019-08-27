import { ConnectionOptions } from 'mongoose'

export const MONGO_URI: string = "mongodb://localhost:27017/admin" // Mongo url
export const MONGO_CONFIG: ConnectionOptions = { // Mongo options
    user: "testing",
    pass: "testing",
    dbName: "testing",
    useNewUrlParser: true
}
export const ROUNDS: number = 10 // Round factor for bcrypt
export const PORT: number = parseInt(process.env.PORT) || 7000 // Port to listen
export const SECRET_KEY: string = "YourSecretKey" // You can use a file with the key