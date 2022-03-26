import React, {lazy} from 'react'
import {Redirect} from 'react-router-dom'

export default [
  {
    path: '/',
    exact: true,
    render: ()=> <Redirect to="/home"/>
  },
  {
    path: '/home',
    component: lazy(()=>import('../pages/home/Root/Root'))
  },
  {
    path: '/category',
    component: lazy(()=>import('../pages/category/Root/Root'))
  },
  {
    path: '/cart',
    component: lazy(()=>import('../pages/cart/Root/Root')),
    routes: [
      {
        path: '/cart/confirm_order',
        component: lazy(()=>import('../pages/cart/ConfirmOrder/ConfirmOrder'))
      }
    ]
  },
  {
    path: '/mine',
    component: lazy(()=>import('../pages/mine/Root/Root')),
    routes: [
      {
        path: '/mine/order_list/:status',
        component: lazy(()=>import('../pages/mine/OrderList/OrderList'))
      }
    ]
  },
  {
    path: '/detail/:id',
    component: lazy(()=>import('../pages/common/Detail/Detail'))
  },
  // 登录
  {
    path: '/login',
    component: lazy(()=>import('../pages/common/Login/Login'))
  },
  {
    path: '',
    render: ()=> <Redirect to="/home"/>
  }
];
