import React from 'react'

export default function OrderList({location}) {
  const title = location.state.title;
  return (
    <div className="page subpage" id="order_list">
        <h1>{title}</h1>
    </div>
  )
}
