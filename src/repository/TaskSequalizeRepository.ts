import { DataTypes, Model, Sequelize } from "sequelize"
import { v4 } from 'uuid'
import { Task, TaskState } from "../model/Task"
import { TaskRepository } from "./TaskRepository"

export class TaskSequalizeRepository implements TaskRepository {
    constructor(
        private readonly sequalize: Sequelize,
        private readonly task = sequalize.define<Model<Task>>('task', {
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            userId: DataTypes.STRING,
            state: DataTypes.STRING,
        })
    ) {
        task.sync()
    }

    private sequalizeTaskToTaskMapper(task: Model<Task>): Task {
        return new Task(
            task.dataValues.id,
            task.dataValues.title,
            task.dataValues.description,
            task.dataValues.userId,
            task.dataValues.state as TaskState
        )
    }

    async create(userId: string, title: string, description: string): Promise<Task> {
        const task = await this.task.create({
            id: v4(),
            title,
            description,
            userId,
            state: TaskState.todo
        })
        return this.sequalizeTaskToTaskMapper(task)
    }

    async read(): Promise<Task[]> {
        const tasks = await this.task.findAll()
        return tasks.map(this.sequalizeTaskToTaskMapper)
    }

    async readByUserId(id: string): Promise<Task[]> {
        const tasks = await this.task.findAll({ where: { userId: id } })
        return tasks.map(this.sequalizeTaskToTaskMapper)
    }

    async readById(id: string): Promise<Task | null> {
        const task = await this.task.findOne({
            where: { id }
        })
        if (!task) return task
        return this.sequalizeTaskToTaskMapper(task)
    }

    async update(task: Task): Promise<Task> {
        await this.task.update({
            title: task.title,
            description: task.description,
            state: task.state
        }, { where: { id: task.id } })
        return task
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.task.destroy({ where: { id } })
        } catch (error) {
            return false
        }
        return true
    }
}