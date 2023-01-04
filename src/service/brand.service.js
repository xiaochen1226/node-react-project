const connection = require("../app/database");

class BrandService {
  async getBrandList() {
    const statement = `SELECT id, name FROM brand`;

    try {
      const [result] = await connection.execute(statement, []);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new BrandService();
