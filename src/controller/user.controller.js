const userService = require("../service/user.service");
const fileService = require("../service/file.service");
const { PRIVATE_KEY } = require("../app/config");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { AVATAR_PATH } = require("../constants/file-path");

class UserController {
  async register(ctx, next) {
    const user = ctx.request.body;

    const result = await userService.register(user);

    ctx.body = {
      status: 200,
      msg: "注册成功",
    };
  }

  async login(ctx, next) {
    const { id, name } = ctx.user;
    const { remember } = ctx.request.body;

    let time = 60 * 60 * 24;
    if (remember) {
      time = time * 7;
    }

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: time,
      algorithm: "RS256",
    });

    ctx.body = {
      data: {
        id,
        name,
        token,
      },
      status: 200,
      msg: "登录成功",
    };
  }

  async avatarInfo(ctx, next) {
    const { merchantId } = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(merchantId);

    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
