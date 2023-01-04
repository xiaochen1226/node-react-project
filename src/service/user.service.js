const connection = require('../app/database')

class UserService {
    async getUserByName(name) {
        const statement = `SELECT * FROM merchant WHERE name = ?`

        const result = await connection.execute(statement, [name])

        return result[0]
    }

    async register(user) {
        const { name, nickname, password } = user

        const statement = `INSERT INTO merchant (name, nickname, password) VALUES (?, ?, ?)`

        const result = await connection.execute(statement, [name, nickname, password])

        return result[0]
    }

    async updateAvatarUrlById(avatar, id) {
        const statement = `UPDATE merchant SET avatar_url = ? WHERE id = ?`

        const [result] = await connection.execute(statement, [avatar, id])

        return result
    }
}

module.exports = new UserService()