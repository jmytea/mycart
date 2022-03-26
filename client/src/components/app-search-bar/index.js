import React, { memo } from 'react'
import './style.scss'

function AppSearchBar() {
  return (
    <div className="app-search-bar">
      <p className="input">
        <span>请输入关键字</span>
        <span>🔍</span>
      </p>
    </div>
  )
}

export default memo(AppSearchBar);
