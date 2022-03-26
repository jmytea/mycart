import React from "react";

export default function OrderItem({ data }) {
  return (
    <div className="order-item">
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
          {data.get("count")}
        </p>
      </div>
    </div>
  );
}
