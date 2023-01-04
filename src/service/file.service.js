const connection = require('../app/database')

class FileService {
    async uploadAvatar(filename, mimetype, size, id) {
        const statement = `INSERT INTO merchant_avatar (filename, mimetype, size, merchant_id) VALUES (?, ?, ?, ?)`

        const [result] = await connection.execute(statement,[filename, mimetype, size, id])

        return result
    }

    async getAvatarByUserId(merchant) {
        const statement = `SELECT * FROM merchant_avatar WHERE merchant_id = ?`

        const [result] = await connection.execute(statement, [merchant])

        return result[0]
    }

    async createFile(originalname, mimetype, size, productId) {
        const statement = `INSERT INTO product_photo (filename, mimetype, size, product_id) VALUES ( ?, ?, ?, ?)`

        const [result] = await connection.execute(statement, [originalname, mimetype, size, productId])
    }

    async getFileByFilename(filename) {
        const statement = `SELECT * FROM product_photo WHERE filename = ?;`

        const [result] = await connection.execute(statement, [filename])

        return result[0]
    }
}

module.exports = new FileService()