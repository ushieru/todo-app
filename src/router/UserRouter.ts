import { Router } from "express"
import asyncHandler from 'express-async-handler'
import { UserRepository } from "../repository/UserRepository"

export const UserRouter = (userRepository: UserRepository) => {
    const router = Router()

    router.get('/', asyncHandler(async (req, res) => {

    }))

    router.get('/:id', asyncHandler(async (req, res) => {

    }))

    router.post('/', asyncHandler(async (req, res) => {

    }))

    router.put('/:id', asyncHandler(async (req, res) => {

    }))

    router.delete('/:id', asyncHandler(async (req, res) => {

    }))

    return router
}