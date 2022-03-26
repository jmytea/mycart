import React, {memo} from "react";
import AppScroll from "../../../../components/app-scroll";

function Menu({ data, selected, onChange }) {
  return (
    <AppScroll className="menu">
      {data.map((item) => (
        <div
          key={item.get('id')}
          className={"menu-item" + (selected === item.get('id') ? " active" : "")}
          onClick={()=>onChange(item.get('id'))}
        >
          {item.get('text')}
        </div>
      ))}
    </AppScroll>
  );
}

export default memo(Menu);