import React, { useState, useCallback } from "react";

export default function SkuBar({ title, list, onSelected }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  // 选择规格的点击事件
  const selectAction = (index, item) => {
    if(index === activeIndex){
      setActiveIndex(-1);
      // 传值给父组件
      onSelected(title, null);
    }else{
      // 修改选中的下标
      setActiveIndex(index);
      // 传值给父组件
      onSelected(title, item);
    }
  };

  return (
    <div className="sku-bar">
      <h3 className="sku-title">{title}</h3>
      <ul className="sku-list">
        {list.map((item, index) => (
          <li
            key={item.get("id")}
            className={`sku-item ${index === activeIndex ? "active" : ""}`}
            onClick={() => selectAction(index, item)}
          >
            {item.get("value")}
          </li>
        ))}
      </ul>
    </div>
  );
}
