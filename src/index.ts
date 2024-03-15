import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { Sequelize } from 'sequelize'
import { ZodError } from 'zod'
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from 'jsonwebtoken'
import expressJSDocSwagger from 'express-jsdoc-swagger'
import { swaggerConfig } from './utils/swaggerContig'
import { DomainError } from './model/errors/DomainError'
import { TaskSequalizeRepository } from './repository/TaskSequalizeRepository'
import { UserSequalizeRepository } from './repository/UserSequalizeRepository'
import { AuthMiddleware } from './middleware/AuthMiddleware'
import { AuthRouter } from './router/AuthRouter'
import { TaskRouter } from './router/TaskRouter'
import { UserRouter } from './router/UserRouter'

export const app = express()
app.use(cors())
app.use(express.json())
expressJSDocSwagger(app)(swaggerConfig);

const sequelize = new Sequelize('sqlite:task_database.sqlite3')
const taskRepository = new TaskSequalizeRepository(sequelize)
const userRepository = new UserSequalizeRepository(sequelize)

app.get('/', (_, res) => res.send('Welcome to: Task app 📑'))
app.use('/api/auth', AuthRouter(userRepository))
app.use('/api/user', AuthMiddleware, UserRouter(userRepository))
app.use('/api/task', AuthMiddleware, TaskRouter(taskRepository))
app.use((_: Request, res: Response) =>
    res.status(404).json({ message: 'Are you lost?' }))
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError)
        return res.status(400).json(err)
    if (err instanceof DomainError)
        return res.status(err.status).json({ message: err.message })
    if (err instanceof TokenExpiredError)
        return res.status(401).json({ message: err.message })
    if (err instanceof JsonWebTokenError)
        return res.status(401).json({ message: err.message })
    if (err instanceof NotBeforeError)
        return res.status(401).json({ message: err.message })
    console.error('Error no controlado:')
    console.error(err)
    return res.status(500).json({ message: 'Oops! Ocurrio un error inténtalo más tarde.' })
})
