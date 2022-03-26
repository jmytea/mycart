import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CartBar() {
  const cartData = useSelector((state) => state.get("cart"));
  const dispatch = useDispatch();
  const history = useHistory();

  // 是否全选的状态
  const selectAll = useMemo(() => {
    //遍历购物车数据，如果全选上了为true，一个没有选中就是为false
    const index = cartData.findIndex((item) => !item.get("checked"));
    return index < 0;
  }, [cartData]);

  // 计算选中商品价格总和
  const pay = useMemo(() => {
    let countPrice = 0;
    cartData.forEach((item) => {
      if (item.get("checked")) {
        countPrice += item.get("count") * item.get("retailPrice");
      }
    });
    return countPrice;
  }, [cartData]);

  // 全选和取消全选的事件
  const selectChangeAction = (ev) => {
    const checked = ev.target.checked;
    cartData.forEach((cartItem) => {
      if (cartItem.get("checked") !== checked) {
        //需要进行修改
        dispatch({
          type: "cart/modify_cart_goods",
          checked: checked,
          id: cartItem.get("_id"),
        });
      }
    });
  };

  // 提交订单的事件
  const submitOrderAction = () => {
    const orders = cartData.filter((item) => item.get("checked"));
    if (orders.size > 0) {
      //有选中的商品
      history.push({
        pathname: "/cart/confirm_order",
        state: {
          from: "cart",
          orders: orders.toJS(),
        },
      });
    } else {
      alert("请先选中商品");
    }
  };

  return (
    <div className="cart-bar">
      <div className="left">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={selectChangeAction}
        />
        {selectAll ? "取消全选" : "全选"}
      </div>
      <div className="middle">
        <p>¥{pay}</p>
      </div>
      <div className="right">
        <button onClick={submitOrderAction}>提交订单</button>
      </div>
    </div>
  );
}
