const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { APP_HOST, APP_PORT } = require("../app/config");

class FileController {
  async saveAvatarInfo(ctx, next) {
    try {
      const { filename, mimetype, size } = ctx.req.file;
      const { id } = ctx.user;

      await fileService.uploadAvatar(filename, mimetype, size, id);
      const avatar = `${APP_HOST}:${APP_PORT}/merchant/${id}/avatar`;
      await userService.updateAvatarUrlById(avatar, id);

      ctx.body = {
        status: 200,
        msg: "上传头像成功",
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FileController();
