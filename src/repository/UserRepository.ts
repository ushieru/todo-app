import { User } from "../model/User"

export interface UserRepository {
    create(name: string, username: string, password: string): Promise<User>
    read(): Promise<User[]>
    readById(id: string): Promise<User | null>
    readByUsername(username: string): Promise<User | null>
    update(user: User): Promise<User>
    delete(id: string): Promise<boolean>
}