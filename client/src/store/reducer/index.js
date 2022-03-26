import { combineReducers } from "redux-immutable"

import homeReducer from '../../pages/home/Root/reducer'
import cateReducer from '../../pages/category/Root/reducer'
import detailReducer from '../../pages/common/Detail/reducer'
import loginReducer from '../../pages/common/Login/reducer'
import userReducer from './userReducer'
import orderReducer from './orderReducer'
import cartReducer from '../../pages/cart/Root/reducer'

const reducer = combineReducers({
  home: homeReducer,
  cate: cateReducer,
  detail: detailReducer,
  login: loginReducer,
  user: userReducer,
  cart: cartReducer,
  order: orderReducer
});

export default reducer;