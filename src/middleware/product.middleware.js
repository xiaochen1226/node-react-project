const Multer = require("koa-multer");
const errorTypes = require("../constants/error-types");
const productService = require("../service/product.service");

const handleArg = Multer().any();

const verifyProductName = async (ctx, next) => {
  try {
    const { name } = ctx.req.body;

    if (!name) {
      const error = new Error(errorTypes.PRODUCT_ARGUMENTS_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }

    const result = await productService.getProductByName(name);
    if (result.length) {
      const error = new Error(errorTypes.PRODUCT_ALREADY_EXISTS);
      return ctx.app.emit("error", error, ctx);
    }

    await next();
  } catch (error) {
    console.log(error);
  }
};

const verifyArg = async (ctx, next) => {
  try {
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
    } = ctx.req.body;
    if (
      !name ||
      !brand_id ||
      !cate_id ||
      !price ||
      !original ||
      !is_sale ||
      !tag ||
      !content ||
      !summary
    ) {
      const error = new Error(errorTypes.PRODUCT_ARGUMENTS_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }

    if (ctx.req.files.length < 1) {
      const error = new Error(errorTypes.PRODUCT_PICTURE_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }

    if (ctx.req.files.length > 9) {
      const error = new Error(errorTypes.PRODUCT_PICTURE_IS_EXCEED);
      return ctx.app.emit("error", error, ctx);
    }

    await next();
  } catch (error) {
    console.log(error);
  }
};

const verifyProductPermission = async (ctx, next) => {
  const productId = ctx.params.productId;
  const { id } = ctx.user;

  // 2.查询是否具备权限
  try {
    const isPermission = await productService.checkPermission(productId, id);
    if (!isPermission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNPRODUCTPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  handleArg,
  verifyProductName,
  verifyArg,
  verifyProductPermission,
};
