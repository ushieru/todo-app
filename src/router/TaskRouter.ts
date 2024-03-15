import { Router } from "express"
import asyncHandler from 'express-async-handler'
import { TaskRepository } from "../repository/TaskRepository"
import { z } from "zod"
import { Task, TaskState } from "../model/Task"
import { DomainError } from "../model/errors/DomainError"

export const TaskRouter = (repository: TaskRepository) => {
    const router = Router()

    /**
     * GET /api/task
     * @summary Read taks
     * @tags Task
     * @security BearerAuth
     * @return {object} 200 - success response
     */
    router.get('/', asyncHandler(async (req, res) => {
        const { user } = res.locals
        const tasks = await repository.readByUserId(user.id)
        res.json(tasks)
    }))

    /**
     * GET /api/task/{id}
     * @summary Read taks
     * @tags Task
     * @security BearerAuth
     * @param {string} id.path.required - task id
     * @return {object} 200 - success response
     */
    router.get('/:id', asyncHandler(async (req, res) => {
        const { id } = req.params
        const task = await repository.readById(id)
        if (!task) throw new DomainError(404, 'Tarea no encontrada')
        res.json(task)
    }))

    /**
     * POST /api/task
     * @summary Read taks
     * @tags Task
     * @security BearerAuth
     * @param {CreateTaskDTO} request.body.required - body - application/json
     * @return {object} 200 - success response
     */
    router.post('/', asyncHandler(async (req, res) => {
        const { title, description } = createTaskDTO.parse(req.body)
        const { user } = res.locals
        const task = await repository.create(user.id, title, description)
        res.json(task)
    }))

    /**
     * PUT /api/task/{id}
     * @summary Read taks
     * @tags Task
     * @security BearerAuth
     * @param {string} id.path.required - task id
     * @param {UpdateTaskDTO} request.body.required - body - application/json
     * @example request - payload example
     * {
     *   "title": "title",
     *   "description": "description",
     *   "status": "todo|inProgress|complete"
     * }
     * @return {object} 200 - success response
     */
    router.put('/:id', asyncHandler(async (req, res) => {
        const { title, description, status } = updateTaskDTO.parse(req.body)
        const { id } = req.params
        const task = await repository.readById(id)
        if (!task) throw new DomainError(404, 'Tarea no encontrada')
        const { user } = res.locals
        if (user.id != task.userId)
            throw new DomainError(403, 'No puedes acceder a este recurso')
        const updatedTask = await repository.update(new Task(task.id, title, description, task.userId, status))
        res.json(updatedTask)
    }))

    /**
     * DELETE /api/task/{id}
     * @summary Read taks
     * @tags Task
     * @security BearerAuth
     * @param {string} id.path.required - task id
     * @return {object} 200 - success response
     */
    router.delete('/:id', asyncHandler(async (req, res) => {
        const { id } = req.params
        const task = await repository.readById(id)
        if (!task) throw new DomainError(404, 'Tarea no encontrada')
        const { user } = res.locals
        if (user.id != task.userId)
            throw new DomainError(403, 'No puedes acceder a este recurso')
        await repository.delete(task.id)
        res.json(task)
    }))

    return router
}

/**
 * CreateTaskDTO
 * @typedef {object} CreateTaskDTO
 * @property {string} title.required
 * @property {string} description.required
 */
const createTaskDTO = z.object({
    title: z.string(),
    description: z.string()
})

/**
 * UpdateTaskDTO
 * @typedef {object} UpdateTaskDTO
 * @property {string} title.required
 * @property {string} description.required
 * @property {string} status.required - - enum:todo,inProgress,complete
 */
const updateTaskDTO = z.object({
    title: z.string(),
    description: z.string(),
    status: z.nativeEnum(TaskState)
})
