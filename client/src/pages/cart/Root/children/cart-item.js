import React, { useState, useCallback, useRef, useEffect } from "react";
import HandleModal from "./handle-modal";
import { useDispatch } from "react-redux";

const useModifyCartGoods = (data) => {
  const id = useRef(data.get("_id"));
  const dispatch = useDispatch();

  // 减
  const onReduce = () => {
    dispatch({
      type: "cart/modify_cart_goods",
      count: data.get("count") - 1,
      id: id.current,
    });
  };

  // 加
  const onAdd = () => {
    dispatch({
      type: "cart/modify_cart_goods",
      count: data.get("count") + 1,
      id: id.current,
    });
  };

  // 修改数量
  const valueChange = useCallback(
    (value) => {
      dispatch({
        type: "cart/modify_cart_goods",
        count: value,
        id: id.current,
      });
    },
    [dispatch]
  );

  // 选中商品
  const onSelectAction = (ev) => {
    dispatch({
      type: "cart/modify_cart_goods",
      checked: ev.target.checked,
      id: id.current,
    });
  };

  // 删除商品的事件
  const deleteAction = () => {
    dispatch({ type: "cart/fetch_delete_cart_goods", id: id.current });
  };

  return {
    onReduce,
    onAdd,
    valueChange,
    onSelectAction,
    deleteAction,
  };
};

export default function CartItem({ data }) {
  const [show, setShow] = useState(false);
  const itemRef = useRef();

  const {
    onReduce,
    onAdd,
    valueChange,
    onSelectAction,
    deleteAction,
  } = useModifyCartGoods(data);

  const showTips = () => {
    alert("至少一件起售");
  };

  // 展示修改数量的面板
  const toggleHandleModal = useCallback((ev) => {
    setShow((show) => !show);
  }, []);

  // 给itemRef添加测滑事件
  useEffect(() => {
    let offset = 0;
    const width = window.dpr * 100;
    itemRef.current.addEventListener("touchstart", (ev) => {
      itemRef.current.className = "cart-item";
      const start = ev.changedTouches[0].clientX - offset;
      const onTouchMove = (ev) => {
        const current = ev.changedTouches[0].clientX;
        offset = current - start;
        if (offset > 0) {
          offset = 0;
        } else if (offset < -1 * width) {
          offset = -1 * width;
        }
        itemRef.current.style.transform = `translateX(${offset}px)`;
      };
      const onTouchEnd = () => {
        itemRef.current.className = "cart-item slide";
        if (-1 * offset > width / 2) {
          //显示删除按钮
          itemRef.current.style.transform = `translateX(-${width}px)`;
          // 记录离开的位置
          offset = -1 * width;
        } else {
          //隐藏删除按钮
          itemRef.current.style.transform = `translateX(0)`;
          // 记录离开的位置
          offset = 0;
        }
        // 移除监听
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
      };
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);
    });
  }, []);

  return (
    <>
      {show && (
        <HandleModal
          value={data.get("count")}
          onChange={valueChange}
          onClose={toggleHandleModal}
        />
      )}

      <div className="cart-item-wrap">
        <div className="cart-item" ref={itemRef}>
          <div className="selected">
            <input
              type="checkbox"
              checked={data.get("checked") || false}
              onChange={onSelectAction}
            />
          </div>
          <div className="img">
            <img src={data.get("goodsImg")} alt="" />
          </div>
          <div className="info">
            <h3>{data.get("goodsName")}</h3>
            <ul className="selected-arr">
              {data.get("selected").map((item) => (
                <li key={item.get("id")}>{item.get("value")}</li>
              ))}
            </ul>
            <p className="price">
              <span>¥{data.get("retailPrice")}</span>
              <span>¥{data.get("counterPrice")}</span>
            </p>
            <p className="handle">
              {data.get("count") <= 1 ? (
                <span className="disable" onClick={showTips}>
                  -
                </span>
              ) : (
                <span onClick={onReduce}>-</span>
              )}
              <span onClick={toggleHandleModal}>{data.get("count")}</span>
              <span onClick={onAdd}>+</span>
            </p>
          </div>
        </div>
        <div className="delete" onClick={deleteAction}>
          删除
        </div>
      </div>
    </>
  );
}
