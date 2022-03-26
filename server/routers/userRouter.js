const { Router } = require("express");
const JWT = require("jsonwebtoken");
const User = require('../model/User');
const router = new Router();

const map = {};

router.post("/send_code", (req, res) => {
  // 手机号码
  const tel = req.fetchBody.tel;
  //生成手机验证码
  let code = Math.floor(Math.random() * 1000000);
  while (code.toString().length < 6) {
    code = "0" + code;
  }
  console.log(code);

  map[tel] = code.toString();
  // 给用户手机发短信
  // [xxxx]:你的验证码:[code],60秒内有效.
  setTimeout(() => {
    res.json({ code: 0, message: "ok" });
  }, 2000);
});

router.post("/check_code", async (req, res) => {
  const { tel, code } = req.fetchBody;
  if (map[tel] !== code) {
    //验证失败,重新获取验证码
    delete map[tel];
    res.json({
      code: 1,
      message: "验证失败，请重新获取验证码",
    });
    return;
  }
  // 做静默注册。获得手机号码，判断用户是否使用过，如果没有就注册一个账号，如果有就直接登录。
  let user = await User.findOne({tel});
  if(!user){
    user = await new User({tel}).save();
  }

  //验证成功，可以登录
  const token = JWT.sign(
    {
      tel,
      _id: user._id
    },
    "hello world",
    {
      expiresIn: '7d'
    }
  );
  // 响应客户端
  setTimeout(() => {
    res.json({
      code: 0,
      message: "ok",
      data: {
        token,
      },
    });
  }, 2000);

});

router.get("/check_login", async (req, res)=>{
  try {
    const token = req.headers['authorization'].replace('Bearer ', '');
    const result = JWT.verify(token, 'hello world');
    const user = await User.findById(result._id);
    if(user){
      res.json({code: 0, message: 'ok'});
    }else{
      throw new Error('用户不存在');
    }
  } catch (error) {
    res.json({code: -1, message: '请重新登录'});
  }

})
module.exports = router;
