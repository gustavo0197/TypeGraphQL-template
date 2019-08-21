import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Hello {
    @Field()
    message: string
    @Field()
    isWorking: boolean
}