import React, { useCallback, useState, useMemo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppScroll from "../../../../components/app-scroll";
import SkuBar from "./sku-bar";
import CountBar from "./count-bar";
import { fromJS } from "immutable";
import {useHistory} from 'react-router-dom'


import Tab from "./tab";
export default function Panel({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userSelectRef = useRef({});
  // 商品id
  const id = useSelector((state) =>
    state.getIn(["detail", "data", "id"])
  );
  // 商品名字
  const name = useSelector(state=>state.getIn(["detail", "data", "name"]));

  // 展示的图片
  const url = useSelector((state) =>
    state.getIn(["detail", "data", "primaryPicUrl"])
  );
  const [picUrl, setPicUrl] = useState(url);

  // 原价
  const oCounterPrice = useSelector((state) =>
    state.getIn(["detail", "data", "counterPrice"])
  );
  const [counterPrice, setCounterPrice] = useState(oCounterPrice);

  // 现价
  const oRetailPrice = useSelector((state) =>
    state.getIn(["detail", "data", "retailPrice"])
  );
  const [retailPrice, setRetailPrice] = useState(oRetailPrice);

  // 用户选择的数量
  const [value, setValue] = useState(1);

  // 规格列表
  const skuList = useSelector((state) =>
    state.getIn(["detail", "data", "skuList"])
  );

  // 每一个规格搭配的信息
  const skuMap = useSelector((state) =>
    state.getIn(["detail", "data", "skuMap"])
  );

  // 用户选择的规格
  // [颜色， 尺码]
  // [null, null]
  const [selectedArr, setSelectedArr] = useState(() => {
    const tmp = new Array(skuList.size).fill(null);
    return fromJS(tmp);
  });

  // 计算得到用户的选中的所有信息
  const selectedInfo = useMemo(() => {
    const ids = selectedArr.map((item) => (item ? item.get("id") : ""));
    const key = ids.join(";");
    return skuMap.get(key);
  }, [selectedArr, skuMap]);

  useEffect(() => {
    // 用户选择的值发生变化，那么重新设置图片，原价，现价
    if (selectedInfo) {
      setPicUrl(selectedInfo.get("pic") || url);
      setCounterPrice(selectedInfo.get("counterPrice") || oCounterPrice);
      setRetailPrice(selectedInfo.get("retailPrice") || oRetailPrice);
    } else {
      //用户还未选中，还原会初始值
      setPicUrl(url);
      setCounterPrice(oCounterPrice);
      setRetailPrice(oRetailPrice);
    }
  }, [selectedInfo, url, oCounterPrice, oRetailPrice]);

  // 将用户的选择存放在ref中
  useEffect(()=>{
    userSelectRef.current = {
      id,
      count: value,
      selected: selectedArr,
      skuList,
      selectedInfo,
      name,
      picUrl,
      counterPrice,
      retailPrice
    };
  }, [value, selectedArr, skuList, selectedInfo, id, name, picUrl, counterPrice, retailPrice]);

  // 是否可以执行下一步：加入购物车或立即购买
  const checkCanRunNext = ()=>{
    const skuList = userSelectRef.current.skuList;
    const arr = userSelectRef.current.selected;
    const index = arr.findIndex(item=>item===null);
    if(index >= 0){
      //还有规格用户没有选
      alert('请选择'+skuList.getIn([index, 'name']));
      return false;
    }else{
      return true;
    }
  }

  // 加入购物车的点击事件
  const onAddCartAction = useCallback(() => {
    if(!checkCanRunNext()){
      return;
    }
    const selected = userSelectRef.current.selected;
    const count = userSelectRef.current.count;
    const id = userSelectRef.current.id;
    const name = userSelectRef.current.name;
    const picUrl = userSelectRef.current.picUrl;
    const counterPrice = userSelectRef.current.counterPrice;
    const retailPrice = userSelectRef.current.retailPrice;
    //用户选完了规格，可以执行下一步，加入购物车
    dispatch({type: 'user/add_goods_to_cart', payload: {
      goodsId: id,
      count, 
      name, 
      picUrl,
      counterPrice,
      retailPrice,
      selected: selected.toJS()
    }});
  }, [dispatch]);

  // 立即购买的点击事件
  const onBuyAction = useCallback(() => {
    if(!checkCanRunNext()){
      return;
    }
    const count = userSelectRef.current.count;
    const counterPrice = userSelectRef.current.counterPrice;
    const id = userSelectRef.current.id;
    const picUrl = userSelectRef.current.picUrl;
    const name = userSelectRef.current.name;
    const retailPrice = userSelectRef.current.retailPrice;
    const selected = userSelectRef.current.selected;

    history.push({pathname: '/cart/confirm_order', state: {
      from: 'detail',
      orders: [
        {
          count,
          counterPrice,
          goodsID: id, 
          goodsImg: picUrl,
          goodsName: name,
          retailPrice: retailPrice,
          selected: selected.toJS(),
        }
      ]
    }});
  }, [history]);

  // 处理选中的规格的事件
  const selectedAction = useCallback(
    (title, item) => {
      // 规格可能有颜色，有尺码等。 在skuList找到用户选的是第几个规格
      const index = skuList.findIndex((item) => item.get("name") === title);
      // 将选中的规格设置在selectedArr的对应的位置
      setSelectedArr((selectedArr) => selectedArr.set(index, item));
    },
    [skuList]
  );

  // 处理数量的变化事件
  const valueChangeAction = useCallback((newValue)=>{
    let tmp = parseInt(newValue);
    if(tmp > 0){
      setValue(tmp);
    }else{
      alert('至少一件起售');
    }
  }, []);

  return (
    <div className="detail-panel">
      <div className="cover" onClick={onClose}></div>
      <button className="close-btn" onClick={onClose}>
        关闭
      </button>
      <AppScroll className="panel-wrap">
        <div className="top">
          <div className="top-img">
            <img className="primary-pic-url" src={picUrl} alt="" />
          </div>
          <div className="top-info">
            <p>
              <span>价格:</span>
              <span>¥{retailPrice}</span>
              <span>{retailPrice === counterPrice || "¥" + counterPrice}</span>
            </p>
            <p>
              <span>已选择:</span>
              <span>
                {selectedArr.filter((item) => item).size > 0
                  ? selectedArr.filter((item) => item).map(item=>item.get('value')).toJS().join(' ')
                  : "请选择规格数量"}
              </span>
            </p>
          </div>
        </div>
        {skuList.map((item) => (
          <SkuBar
            key={item.get("id")}
            title={item.get("name")}
            list={item.get("skuSpecValueList")}
            onSelected={selectedAction}
          />
        ))}
        <CountBar value={value} onValueChange={valueChangeAction}/>
      </AppScroll>
      <Tab onAddCart={onAddCartAction} onBuy={onBuyAction} />
    </div>
  );
}
