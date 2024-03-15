import { Task } from "../model/Task"

export interface TaskRepository {
    create(userId: string, title: string, description: string): Promise<Task>
    read(): Promise<Task[]>
    readByUserId(id: string): Promise<Task[]>
    readById(id: string): Promise<Task | null>
    update(task: Task): Promise<Task>
    delete(id: string): Promise<boolean>
}
