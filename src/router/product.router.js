const Router = require("koa-router");
const { verifyAuth } = require("../middleware/user.middleware");
const { pictureResize } = require("../middleware/file.middleware");
const {
  verifyProductName,
  handleArg,
  verifyArg,
  verifyProductPermission,
} = require("../middleware/product.middleware");
const {
  increment,
  pictureInfo,
  remove,
  update,
  list,
  getProduct,
} = require("../controller/product.controller");

const productRouter = new Router({ prefix: "/product" });

productRouter.post(
  "/increment",
  verifyAuth,
  handleArg,
  verifyProductName,
  verifyArg,
  pictureResize,
  increment
);
productRouter.get("/picture/:filename", pictureInfo);
productRouter.get("/", list);
productRouter.get("/id/:id", verifyAuth, getProduct);
productRouter.delete(
  "/delete/:productId",
  verifyAuth,
  verifyProductPermission,
  remove
);
productRouter.patch(
  "/update/:productId",
  verifyAuth,
  verifyProductPermission,
  update
);

module.exports = productRouter;
