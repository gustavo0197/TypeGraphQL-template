import "reflect-metadata"
import { PORT, MONGO_URI, MONGO_CONFIG } from './config'
import { Server } from './server'
import { Mongoose } from './models'

console.log("\x1Bc")

async function runServer(){
    await Promise.all([
        new Server(PORT),
        new Mongoose(MONGO_URI, MONGO_CONFIG)
    ])
}

runServer()