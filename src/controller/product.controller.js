const productService = require("../service/product.service");
const fileService = require("../service/file.service");
const { PICTURE_PATH } = require("../constants/file-path");
const { APP_HOST, APP_PORT } = require("../app/config");
const fs = require("fs");
const path = require("path");

class ProductController {
  async increment(ctx, next) {
    try {
      const product = await productService.incrementProduct(
        ctx.req.body,
        ctx.user.id
      );

      const files = ctx.req.files;
      const productId = product.insertId;

      const pictureUrl = `${APP_HOST}:${APP_PORT}/product/picture/${files[0].filename}`;
      await productService.updateProductPictureUrlById(pictureUrl, productId);

      for (let file of files) {
        const { filename, mimetype, size } = file;
        await fileService.createFile(filename, mimetype, size, productId);
      }

      ctx.body = {
        status: 200,
        msg: "新增商品成功",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async pictureInfo(ctx, next) {
    let { filename } = ctx.params;

    const fileInfo = await fileService.getFileByFilename(filename);

    const { type } = ctx.query;
    const types = ["small", "middle", "large"];
    if (types.some((item) => item === type)) {
      filename = filename + "-" + type;
    }

    ctx.response.set("content-type", fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }

  async getProduct(ctx, next) {
    let { id } = ctx.params;

    const result = await productService.getProductById(id);

    ctx.body = {
      data: result,
      status: 200,
      msg: "",
    };
  }

  async remove(ctx, next) {
    const { productId } = ctx.params;

    await productService.remove(productId);

    ctx.body = {
      status: 200,
      msg: "删除商品成功",
    };
  }

  async update(ctx, next) {
    const { productId } = ctx.params;

    await productService.update(ctx.request.body, productId);

    ctx.body = {
      status: 200,
      msg: "修改商品成功",
    };
  }

  async list(ctx, next) {
    const { r1, r2 } = await productService.getProductList(ctx.query);

    ctx.body = {
      data: r1,
      total: r2,
      status: 200,
      msg: "获取成功",
    };
  }
}

module.exports = new ProductController();
