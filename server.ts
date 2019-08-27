import { buildSchema } from 'type-graphql'
import { ApolloServer, ApolloError } from 'apollo-server-koa'
import Koa from 'koa'
import { decodeToken } from './helpers/auth'; // token decoder
import { Container } from 'typedi'
import { isAuth } from './middlewares/authentication';

export class Server {
    private koa: Koa = new Koa() // Koa server
    private graphQLServer: ApolloServer // Apollo server

    constructor(private PORT: number){ // Port to listen
        this.setUpServer()
    }
    
    private async setUpServer(){
        this.graphQLServer = new ApolloServer({
            schema: await buildSchema({ // Build types and resolvers
                resolvers: [__dirname + "/resolvers/*.resolver.*s"], // import all resolvers
                authChecker: isAuth, // Authentication middleware
                container: Container // Dependency injection
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
                else { // On every connection returns the decoded token and send it to the resolvers
                    return { auth: decodeToken(ctx.request.header.token) }
                }
            }
        })
        // Once the schema is ready then run the server in the given port.
        this.runServer()
    }
    
    private async runServer(){
        try {
            let subscriptionsServer = await this.koa.listen(this.PORT)
            this.graphQLServer.applyMiddleware({app: this.koa})
            this.graphQLServer.installSubscriptionHandlers(subscriptionsServer)
            console.log(`Listening on http://localhost:${this.PORT}`)
        } catch (error) {
            console.log(error)
        }
    }
}