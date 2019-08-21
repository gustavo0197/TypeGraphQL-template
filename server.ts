import { buildSchema } from 'type-graphql'
import { ApolloServer, ApolloError } from 'apollo-server-koa'
import Koa from 'koa'
import { HelloResolver } from './resolvers/Hello.resolver';
import { decodeToken } from './middlewares/auth';

export class Server {
    private koa: Koa = new Koa() // Koa server
    private graphQLServer: ApolloServer // Apollo server

    constructor(private PORT: number){ // Port to listen
        this.setUpServer()
    }
    
    private async setUpServer(){
        this.graphQLServer = new ApolloServer({
            schema: await buildSchema({ // Build types and resolvers
                resolvers: [HelloResolver]
            }),
            subscriptions: {
                onConnect: (params: any, webSocket) => {
                    if(params.token){ // If has a token the verify it
                        return { auth: decodeToken(params.token) }
                    }
                    else { // If it's an invalid token don't let the user to connect
                        throw new ApolloError("Need a valid token")
                    }
                }
            },
            context: async ({ connection, ctx }) => {
                if(connection){
                    return connection.context
                }
                else { // On every connection returns the verified token
                    return { auth: decodeToken(ctx.request.header.token) }
                }
            }
        })
        // Once the schema is ready then run the server in the given port.
        this.runServer()
    }
    
    private async runServer(){
        let subscriptionsServer = await this.koa.listen(this.PORT)
        this.graphQLServer.applyMiddleware({app: this.koa})
        this.graphQLServer.installSubscriptionHandlers(subscriptionsServer)
    }
}