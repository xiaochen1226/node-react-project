const connection = require("../app/database");

class CateService {
  async getCateList() {
    const statement = `SELECT id, name FROM cate`;

    try {
      const [result] = await connection.execute(statement, []);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CateService();
