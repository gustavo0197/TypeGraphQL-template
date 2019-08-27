import { AuthChecker } from 'type-graphql'

interface UserAuth {
    // user: string
    roles: Array<string>
    auth: Object
}

// Authentication middleware. Looks for a valid token
export const isAuth: AuthChecker<UserAuth> = (
    {root, args, context, info},
    roles
) => {
    let isValidUser: boolean = false

    roles.forEach( role => {
        if(context.auth[role]){
            isValidUser = true
        }
    })

    return isValidUser
}