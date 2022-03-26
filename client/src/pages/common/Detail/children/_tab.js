import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

const shareIcon = "https://i.52112.com/icon/jpg/256/20190531/42036/1978633.jpg";
const cartIcon = "https://i.52112.com/icon/jpg/256/20160510/1738/96469.jpg";

export default function Tab({onAddCart, onBuy}) {
  const history = useHistory();

  // 进入购物车的点击事件
  const goCartAction = useCallback(() => {
    history.push("/cart");
  }, [history]);

  return (
    <div className="tab">
      <div className="icon share">
        <img src={shareIcon} alt="" />
      </div>
      <div className="icon go-cart" onClick={goCartAction}>
        <img src={cartIcon} alt="" />
      </div>
      <div className="btn" onClick={onAddCart}>加入购物车</div>
      <div className="btn" onClick={onBuy}>立即购买</div>
    </div>
  );
}
