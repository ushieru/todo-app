import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { DomainError } from "../model/errors/DomainError"
import { getEnvVar } from '../utils/getEnvVar'

const secret = getEnvVar('JWT_SECRET')

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    if (!authorization)
        throw new DomainError(401, 'Se requiere autorización para esta peticion.')
    const [prefix, token] = authorization.split(' ')
    if (prefix != 'Bearer')
        throw new DomainError(400, 'Se espera: "Bearer <JWT>"')
    const user = jwt.verify(token, secret)
    res.locals.user = user
    return next()
}
