import { Router } from "express"
import asyncHandler from 'express-async-handler'
import { UserRepository } from "../repository/UserRepository"
import { DomainError } from '../model/errors/DomainError'

export const UserRouter = (userRepository: UserRepository) => {
    const router = Router()

    router.get('/', asyncHandler(async (req, res) => {
        throw new DomainError(500, "Method not implemented.")
    }))

    router.get('/:id', asyncHandler(async (req, res) => {
        throw new DomainError(500, "Method not implemented.")
    }))

    router.post('/', asyncHandler(async (req, res) => {
        throw new DomainError(500, "Method not implemented.")
    }))

    router.put('/:id', asyncHandler(async (req, res) => {
        throw new DomainError(500, "Method not implemented.")
    }))

    router.delete('/:id', asyncHandler(async (req, res) => {
        throw new DomainError(500, "Method not implemented.")
    }))

    return router
}