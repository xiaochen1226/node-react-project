const cateService = require("../service/cate.service");

class CateController {
  async list(ctx, next) {
    const result = await cateService.getCateList();

    ctx.body = {
      data: result,
      total: result.length,
      status: 200,
      msg: "获取成功",
    };
  }
}

module.exports = new CateController();
