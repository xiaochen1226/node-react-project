const brandService = require("../service/brand.service");

class BrandController {
  async list(ctx, next) {
    const result = await brandService.getBrandList();

    ctx.body = {
      data: result,
      total: result.length,
      status: 200,
      msg: "获取成功",
    };
  }
}

module.exports = new BrandController();
