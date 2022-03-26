const { Router } = require("express");
const JWT = require("jsonwebtoken");
const User = require("../model/User");
const Order = require('../model/Order');
const router = new Router();

// 登录了的用户才可以操作订单
router.use(async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const result = JWT.verify(token, "hello world");
    const user = await User.findById(result._id);
    if (user) {
      req.userInfo = user;
      next(); //登录了，可以操作购物车
    } else {
      throw new Error("用户不存在");
    }
  } catch (error) {
    console.log(error);
    res.json({ code: -1, message: "请重新登录" });
  }
});

router.post('/confirm', async (req, res)=>{
  const data = req.fetchBody;
  const result = await new Order({
    user: req.userInfo._id,
    orders: data.orders,
    pay: data.pay
  }).save();
  res.json({
    code: 0,
    message: 'ok',
    data: result
  });
})

module.exports = router;

