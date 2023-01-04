const Router = require("koa-router");
const {
  verifyUser,
  handlePassword,
  verifyLogin,
  verifyAuth,
} = require("../middleware/user.middleware");
const {
  register,
  login,
  avatarInfo,
} = require("../controller/user.controller");

const userRouter = new Router({ prefix: "/merchant" });

userRouter.post("/register", verifyUser, handlePassword, register);
userRouter.post("/login", verifyLogin, login);
userRouter.get("/:merchantId/avatar", avatarInfo);
userRouter.get("/auth", verifyAuth, (ctx, next) => {
  ctx.body = {
    status: 200,
    msg: "授权成功",
  };
});

module.exports = userRouter;
