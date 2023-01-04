const Router = require("koa-router");
const { list } = require("../controller/cate.controller");

const cateRouter = new Router({ prefix: "/cate" });

cateRouter.get("/", list);

module.exports = cateRouter;
