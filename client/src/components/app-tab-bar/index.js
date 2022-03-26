import React, { memo } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./style.scss";

export const TabItem = withRouter(
  memo(({ name, icon, selectedIcon, path, location }) => {
    const isActive = location.pathname.startsWith(path);
    return (
      <NavLink className="tab-item" to={path}>
        <img src={isActive ? selectedIcon : icon} alt="" />
        <span>{name}</span>
      </NavLink>
    );
  })
);

export const TabBar =  memo(({ children }) => {
  return <nav className="tab-bar">{children}</nav>;
})
