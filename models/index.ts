import mongoose, { ConnectionOptions } from 'mongoose'

export class Mongoose {    
    constructor(
        private mongoUri: string, // Url
        private mongoOptions: ConnectionOptions // user / pass options
    ){
        this.setUpDatabase() // Start mongo config
    }

    private async setUpDatabase(){
        try { // Try to make a connection
            await mongoose.connect(this.mongoUri, this.mongoOptions)
            console.log("Mongo is ready")
        } catch (error) {
            console.log(error)
        }
    }
}