import { ConnectionOptions } from 'mongoose'

export const MONGO_URI: string = "mongodb://localhost:27017/admin"
export const MONGO_CONFIG: ConnectionOptions = {
    user: "testing",
    pass: "testing",
    dbName: "testing",
    useNewUrlParser: true
}

export const PORT: number = parseInt(process.env.PORT) || 7000
export const SECRET_KEY: string = "YourSecretKey" // You can use a file with the key