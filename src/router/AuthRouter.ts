import { Router } from "express"
import asyncHandler from 'express-async-handler'
import { z } from "zod"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getEnvVar } from '../utils/getEnvVar'
import { DomainError } from '../model/errors/DomainError'
import { UserRepository } from "../repository/UserRepository"

export const AuthRouter = (userRepository: UserRepository) => {
    const router = Router()
    const secretJWT = getEnvVar('JWT_SECRET')

    /**
     * POST /api/auth
     * @summary Auth endpoint
     * @tags Auth
     * @param {AuthRequestDTO} request.body.required - body - application/json
     * @return {object} 200 - success response
     */
    router.post('/', asyncHandler(async (req, res) => {
        const { username, password } = authRequestDTO.parse(req.body)
        const payload = await userRepository.readByUsername(username)
        if (!payload) throw new DomainError(404, 'Usuario no encontrado')
        const match = await bcrypt.compare(password, payload.password)
        if (!match) throw new DomainError(404, 'Usuario no encontrado')
        const { password: _, ...user } = payload
        const token = jwt.sign(user, secretJWT)
        res.json({ user, token })
    }))

    /**
     * POST /api/auth/signup
     * @summary Signup endpoint
     * @tags Auth
     * @param {SignupRequestDTO} request.body.required - body - application/json
     * @return {object} 200 - success response
     */
    router.post('/signup', asyncHandler(async (req, res) => {
        const { name, username, password } = signupRequestDTO.parse(req.body)
        const hashedPassword = await bcrypt.hash(password, 12)
        const createdUser = await userRepository.create(name, username, hashedPassword)
        const { password: _, ...user } = createdUser
        const token = jwt.sign(user, secretJWT)
        res.json({ user, token })
    }))

    return router
}

/**
 * AuthRequestDTO
 * @typedef {object} AuthRequestDTO
 * @property {string} username.required
 * @property {string} password.required
 */
const authRequestDTO = z.object({
    username: z.string(),
    password: z.string(),
})

/**
 * SignupRequestDTO
 * @typedef {object} SignupRequestDTO
 * @property {string} name.required
 * @property {string} username.required
 * @property {string} password.required
 */
const signupRequestDTO = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
})
