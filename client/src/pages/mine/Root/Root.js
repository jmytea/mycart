import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppScroll from "../../../components/app-scroll";
import { renderRoutes } from "../../../utils/renderRoutes";

const orderMenu = [
  { title: "全部订单", status: -1 },
  { title: "待付款", status: 0 },
  { title: "待发货", status: 1 },
  { title: "待收货", status: 2 },
  { title: "待评价", status: 3 },
];

export default function Root({ route }) {
  const isLogin = useSelector(
    (state) => state.getIn(["login", "loginStatus"]) === 2
  );

  return (
    <>
      {/* 根页面 */}
      <div className="page" id="mine-root">
        <header className="header">
          <h1>我的</h1>
        </header>
        {isLogin ? (
          <AppScroll className="content">
            <ul>
              {orderMenu.map((item) => (
                <li key={item.status}>
                  <Link to={{ pathname: `/mine/order_list/${item.status}`,state: {title: item.title} }}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AppScroll>
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
