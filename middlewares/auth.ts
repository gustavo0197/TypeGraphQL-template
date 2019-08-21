import { verify } from 'jsonwebtoken'
import { SECRET_KEY } from '../config';

// Tries to decode some token. If it's a valid token then return the data
// otherwise return false which means that is not a valid token.
export function decodeToken(token: string){
    try {
        return verify(token, SECRET_KEY)
    } catch (error) {
        return false // Invalid or expired token
    }
}