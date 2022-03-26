import React, {useState} from 'react'
import { useCallback } from 'react';

export default function CountBar({value, onValueChange}) {
  
  // 修改事件
  const changeAction = (ev)=>{
    onValueChange(ev.target.value);
  };

  // 减
  const reduceAction = ()=>{
    onValueChange(value - 1);
  };

  // 加
  const addAction = ()=>{
    onValueChange(value + 1);

  };

  return (
    <div className="count-bar">
      <span className={value<=1 ? "disable" : ''} onClick={reduceAction}>-</span>
      <input type="number" value={value} onChange={changeAction}/>
      <span onClick={addAction}>+</span>
    </div>
  )
}
