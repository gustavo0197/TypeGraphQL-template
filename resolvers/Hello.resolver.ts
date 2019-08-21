import { Resolver, Query } from 'type-graphql'
import { Hello } from '../types/Hello.type';

@Resolver(Hello)
export class HelloResolver {
    @Query(returns => Hello)
    hello(){
        return {
            message: "Hello world :D",
            isWorking: true
        }
    }
}