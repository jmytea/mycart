const { Router } = require("express");
const axios = require("axios");
const url = require("url");

const router = new Router();

router.get("/home", async (req, res) => {
  const [indexData] = await Promise.all([
    axios.get(
      "https://m.you.163.com/xhr/index.json?__timestamp=" + new Date().getTime()
    ),
  ]);

  // 轮播图数据
  const bannerData = indexData.data.data.data.focusList.map((item) => ({
    id: item.id,
    picUrl: item.picUrl,
  }));
  // 分类数据
  const cateData = indexData.data.data.data.kingKongModule.kingKongList
    .filter((item, index) => index > 0 && index <= 8)
    .map((item) => {
      const {
        query: { categoryId },
      } = url.parse(item.schemeUrl, true);
      return {
        picUrl: item.picUrl,
        id: categoryId,
        text: item.text,
      };
    });
  // 新品首发
  const newGoodsData = indexData.data.data.data.newItemList.map((item) => ({
    id: item.id,
    name: item.name,
    picUrl: item.primaryPicUrl,
    retailPrice: item.retailPrice,
  }));
  res.json({ bannerData, cateData, newGoodsData });
});

router.get("/cate_list", async (req, res) => {
  const result = await axios.get("http://m.you.163.com/item/list.json", {
    params: {
      __timestamp: new Date().getTime(),
      categoryId: req.query.id,
    },
  });
  const listData = result.data.data.categoryItemList.map(({category, itemList}) => ({
    category: {
      id: category.id,
      name: category.name,
      frontName: category.frontName,
    },
    itemList: itemList.map((item) => ({
      id: item.id,
      name: item.name,
      listPicUrl: item.listPicUrl,
      simpleDesc: item.simpleDesc,
      listPromBanner: item.listPromBanner,
      retailPrice: item.retailPrice,
      counterPrice: item.counterPrice,
      itemTagList: item.itemTagList,
    })),
  }));
  res.json({
    listData
  });
});

router.get('/detail', async (req, res)=>{
  const id = req.query.id;
  const {data: {item}} = await axios.get('https://m.you.163.com/item/detail?id='+id);
  const newItem = {};
  newItem.bannerData = Object.entries(item.itemDetail).filter(([key])=>key.startsWith('picUrl')).map(([key, value])=>value);
  newItem.videoInfo = item.itemDetail.videoInfo;
  newItem.name = item.name;
  newItem.detailHtml = item.itemDetail.detailHtml;
  newItem.skuList = item.skuSpecList;
  newItem.primaryPicUrl = item.primaryPicUrl;
  newItem.counterPrice = item.counterPrice;
  newItem.retailPrice = item.retailPrice;
  newItem.skuMap = item.skuMap;
  newItem.id = item.id;
  // res.json(item);
  res.json(newItem);
})
module.exports = router;
