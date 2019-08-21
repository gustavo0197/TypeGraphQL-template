import "reflect-metadata"
import { PORT } from './config'
import { Server } from './server'

const server: Server = new Server(PORT)