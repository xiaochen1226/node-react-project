const Router = require("koa-router");
const { list } = require("../controller/brand.controller");

const brandRouter = new Router({ prefix: "/brand" });

brandRouter.get("/", list);

module.exports = brandRouter;
