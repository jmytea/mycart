import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export default function HandleModal({value, onClose, onChange}) {
  const el = useRef(document.createElement("div"));

  // 输入框的值
  const [count, setCount] = useState(value);

  useEffect(() => {
    document.querySelector("body").appendChild(el.current);
    el.current.className = "modal handle-modal";
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.querySelector("body").removeChild(el.current);
    };
  }, []);

  const valueChange = (ev)=>{
    setCount(ev.target.value);
  }

  const onConfirm = ()=>{
    // 判断数据是否有效
    const tmp = parseInt(count);
    if(tmp >= 1){
      // 修改好的数据告诉父级
      onChange(tmp);
      // 关闭弹出框
      onClose();
    }else{
      alert('至少一件起售');
    }
  }

  return ReactDOM.createPortal(
    <div className="handle-warp">
      <div className="text">
        <input type="text" value={count} onChange={valueChange}/>
      </div>
      <div className="handle">
        <button onClick={onConfirm}>确定</button>
        <button onClick={onClose}>取消</button>
      </div>
    </div>,
    el.current
  );
}
