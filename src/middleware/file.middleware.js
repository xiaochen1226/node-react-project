const Jimp = require("jimp");
const fs = require("fs");
const Multer = require("koa-multer");
const path = require("path");
const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path");
const crypto = require("crypto");

const avatarUpload = Multer({
  dest: AVATAR_PATH,
});

const avatarHandler = avatarUpload.single("avatar");

const pictureResize = async (ctx, next) => {
  try {
    const files = ctx.req.files;

    for (let file of files) {
      file.filename = crypto
        .createHash("md5")
        .update(file.originalname + Date.now())
        .digest("hex");
      const destPath = path.join(PICTURE_PATH, file.filename);
      fs.writeFile(destPath, file.buffer, (err, data) => {
        Jimp.read(destPath).then((image) => {
          image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
          image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
          image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
        });
      });
    }

    await next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  avatarHandler,
  pictureResize,
};
