import { DataTypes, Model, Sequelize } from "sequelize"
import { v4 } from "uuid"
import { User } from "../model/User"
import { UserRepository } from "./UserRepository"

export class UserSequalizeRepository implements UserRepository {
    constructor(
        private readonly sequalize: Sequelize,
        private readonly user = sequalize.define<Model<User>>('user', {
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: DataTypes.STRING,
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            password: DataTypes.STRING
        })
    ) {
        user.sync()
    }

    private sequalizeUserToUserMapper(user: Model<User>): User {
        return new User(
            user.dataValues.id,
            user.dataValues.name,
            user.dataValues.username,
            user.dataValues.password
        )
    }

    async create(name: string, username: string, password: string): Promise<User> {
        const user = await this.user.create({
            id: v4(),
            name,
            username,
            password
        })
        return this.sequalizeUserToUserMapper(user)
    }

    async read(): Promise<User[]> {
        const users = await this.user.findAll()
        return users.map(this.sequalizeUserToUserMapper)
    }

    async readById(id: string): Promise<User | null> {
        const user = await this.user.findOne({ where: { id } })
        if (!user) return user
        return this.sequalizeUserToUserMapper(user)
    }

    async readByUsername(username: string): Promise<User | null> {
        const user = await this.user.findOne({ where: { username } })
        if (!user) return user
        return this.sequalizeUserToUserMapper(user)
    }

    async update(user: User): Promise<User> {
        await this.user.update(user, { where: { id: user.id } })
        return user
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.user.destroy({ where: { id } })
        } catch (error) {
            return false
        }
        return true
    }
}
