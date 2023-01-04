const connection = require("../app/database");

class ProductService {
  async getProductByName(name) {
    const statement = `SELECT * FROM product WHERE name = ?`;

    const [result] = await connection.execute(statement, [name]);

    return result;
  }

  async incrementProduct(args, merchantId) {
    const {
      name,
      brand_id,
      cate_id,
      price,
      original,
      is_sale,
      tag,
      content,
      summary,
    } = args;

    const statement = `INSERT INTO product 
            (name, merchant_id, brand_id, cate_id, price, original, is_sale, tag, content, summary) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await connection.execute(statement, [
      name,
      merchantId,
      brand_id,
      cate_id,
      price,
      original,
      is_sale,
      tag,
      content,
      summary,
    ]);

    return result;
  }

  async updateProductPictureUrlById(pictureUrl, productId) {
    const statement = `UPDATE product SET photo_url = ? WHERE id = ?`;

    const [result] = await connection.execute(statement, [
      pictureUrl,
      productId,
    ]);
  }

  async checkPermission(productId, merchantId) {
    const statement = `SELECT * FROM product WHERE id = ? AND merchant_id = ?;  `;
    const [result] = await connection.execute(statement, [
      productId,
      merchantId,
    ]);
    return result.length === 0 ? false : true;
  }

  async remove(productId) {
    const statement = `DELETE FROM product WHERE id = ?;`;
    const [result] = await connection.execute(statement, [productId]);

    return result;
  }

  async update(args, productId) {
    let data = [];
    let argkey = "";
    Object.keys(args).forEach((item) => {
      argkey += `${item} = ?,`;
      data.push(args[item]);
    });
    data.push(productId);
    argkey = argkey.slice(0, argkey.length - 1);

    const statement = `UPDATE product SET ${argkey} WHERE id = ?;`;
    const [result] = await connection.execute(statement, data);

    return result;
  }

  async getProductList(query) {
    const { offset, size, orderKey, orderRuler, name, ...other } = query;
    let search = "";
    const limit = ` LIMIT ${offset}, ${size}`;
    let once = true;
    if (Object.keys(other).length) {
      for (let key in other) {
        if (once) {
          search = `WHERE ${key} = ${other[key]}`;
        } else {
          search += ` AND ${key} = ${other[key]}`;
        }
        once = false;
      }
    }
    if (name && once) {
      search = `WHERE name LIKE '%${name}%'`;
    } else if (name) {
      search += ` AND name LIKE '%${name}%'`;
    }
    if (orderKey) {
      search += ` ORDER BY ${orderKey} ${orderRuler}`;
    }
    search += limit;

    const statement = `SELECT
        SQL_CALC_FOUND_ROWS id,
        p.name name,
        p.merchant_id merchantid,
        (SELECT name FROM merchant m WHERE p.merchant_id = m.id) merchantName, 
        (SELECT name FROM brand b WHERE p.brand_id = b.id) brand,
        (SELECT name FROM cate c WHERE p.cate_id = c.id) cate,
        p.price price,
        p.original original,
        p.tag tag,
        p.content content,
        p.summary summary,
        p.photo_url imgUrl,
        if(p.is_sale='1','上架','下架') is_sale,
        p.createAt createTime,
        p.updateAt updateTime
    FROM product p ${search}; SELECT FOUND_ROWS() as total;`;

    try {
      const [result1] = await connection.query(statement);
      const [r1, r2] = result1;

      return {
        r1,
        r2: r2[0].total,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    const statement = `SELECT * FROM product WHERE id = ?;`;

    const [result] = await connection.execute(statement, [id]);

    return result[0];
  }
}

module.exports = new ProductService();
