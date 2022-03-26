import React, { memo, useMemo, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AppScroll from "../../../components/app-scroll";
import AppLoading from "../../../components/app-loading";
import OrderItem from "./children/order-item";
import "./style.scss";
import { fromJS } from "immutable";
import { useDispatch, useSelector } from "react-redux";

const ConfirmOrder = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const confirmStatus = useSelector((state) =>
    state.getIn(["order", "confirmOrderStatus"])
  );

  const orders = useMemo(() => {
    return fromJS(location.state.orders);
  }, [location]);
  const from = useMemo(() => {
    return location.state.from;
  }, [location]);

  const pay = useMemo(() => {
    let countPrice = 0;
    orders.forEach((item) => {
      countPrice += item.get("count") * item.get("retailPrice");
    });
    //使用优惠和折扣
    return countPrice;
  }, [orders]);

  // 返回事件
  const backAction = () => {
    history.goBack();
  };

  // 提交订单事件
  const confirmAction = () => {
    console.log(orders.toJS());
    dispatch({ type: "order/fetch_confirm_order", orders: orders.toJS(), pay });
  };

  // 监听订单状态的变化
  useEffect(() => {
    //当confirmStatus的值为2时提交订单就成功了。执行下一步操作了。
    if(confirmStatus === 2){
      console.log(1111);
      if(from === 'cart'){
        //下订单成功，删除掉购物车中选中的商品
        orders.forEach(item=>{
          dispatch({ type: "cart/fetch_delete_cart_goods", id: item.get('_id') });
        })
      }else if(from === 'detail'){
        // 从详情页下单的，什么也不做
      }
      //进入订单的付款页面
      
    }
  }, [confirmStatus, from, dispatch, orders])


  return (
    <div className="page subpage" id="confirm-order">
      {confirmStatus === 1 && <AppLoading />}
      <header className="header">
        <button className="left-btn" onClick={backAction}>
          返回
        </button>
        <h1 className="title">确认订单</h1>
      </header>
      <AppScroll className="content">
        <p>选择收货地址</p>
        {orders.map((item, index) => (
          <OrderItem key={index} data={item} />
        ))}
        <p>应付：{pay}</p>
      </AppScroll>
      <div className="confirm-bar">
        <button onClick={confirmAction}>提交订单</button>
      </div>
    </div>
  );
};

export default memo(ConfirmOrder);
