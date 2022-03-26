const { Router } = require("express");
const JWT = require("jsonwebtoken");
const User = require("../model/User");
const Cart = require("../model/Cart");
const router = new Router();

// 登录了的用户才可以操作购物车
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

// 添加商品到购物车
router.post("/add_goods", async (req, res) => {
  const {
    goodsId,
    count,
    name,
    picUrl,
    selected,
    counterPrice,
    retailPrice,
  } = req.fetchBody;
  const selectedIDs = selected.map((item) => item.id).join(";");
  // 查询该商品是否存在购物车
  const cartData = await Cart.findOne({
    user: req.userInfo._id,
    goodsID: goodsId,
    selectedIDs,
  });
  if (cartData) {
    // 该商品和用户的规格选择用户已经选择了，数量进行叠加
    await Cart.updateOne(
      {
        user: req.userInfo._id,
        goodsID: goodsId,
        selectedIDs,
      },
      {
        count: cartData.count + count,
      }
    );
  } else {
    // 不存在，添加到购物车
    await new Cart({
      goodsID: goodsId,
      goodsName: name,
      goodsImg: picUrl,
      user: req.userInfo._id,
      count,
      selected,
      selectedIDs,
      counterPrice,
      retailPrice,
    }).save();
  }
  res.json({ code: 0, message: "ok" });
});

// 查询用户的所有购物车商品
router.get("/get_data", async (req, res) => {
  const result = await Cart.find({ user: req.userInfo._id });
  res.json({
    code: 0,
    message: "ok",
    data: result,
  });
});

// 修改购物车商品的数量
router.post("/modify", async (req, res) => {
  const { id, ...rest } = req.fetchBody;
  const result = await Cart.updateOne({ _id: id }, rest);
  res.json({ code: 0, message: "ok" });
});

// 删除商品
router.get("/delete", async (req, res) => {
  const id = req.query.id;
  await Cart.findByIdAndDelete(id);
  res.json({ code: 0, message: "ok" });
});

module.exports = router;

// 移动端1
// vue2
// node2
// react2
// 小程序2
// rn2
// 数据可视化 1
// electron 1
