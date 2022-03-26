import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./children/cart-item";
import CartBar from "./children/cart-bar";
import AppScroll from "../../../components/app-scroll";
import { renderRoutes } from "../../../utils/renderRoutes";
import { Link } from "react-router-dom";
// import PubSub from 'pubsub-js'
import "./style.scss";

export default function Root({ route }) {
  const dispatch = useDispatch();
  const isLogin = useSelector(
    (state) => state.getIn(["login", "loginStatus"]) === 2
  );
  // 获得购物车数据
  const cartData = useSelector((state) => state.getIn(["cart"]));

  // 请求购物车的数据
  useEffect(() => {
    if(isLogin){
      dispatch({ type: "cart/get_cart_data" });
    }
  }, [dispatch, isLogin]);

  // 监听下单成功的事件
  // useEffect(() => {
  //   const token = PubSub.subscribe('confirm-order-success', ()=>{
  //     //执行相关的操作
  //   });
  //   return () => {
  //     PubSub.unsubscribe(token);
  //   }
  // }, [])

  return (
    <>
      {/* 根页面 */}
      <div className="page" id="cart-root">
        <header className="header">
          <h1>购物车</h1>
        </header>
        {isLogin ? (
          <>
            <AppScroll className="content">
              {cartData.map((item) => (
                <CartItem key={item.get("_id")} data={item} />
              ))}
            </AppScroll>
            <CartBar />
          </>
        ) : (
          <div>
            <Link to="/login">登录</Link>
          </div>
        )}
      </div>
      {/* 子页面 */}
      {renderRoutes(route.routes)}
    </>
  );
}
