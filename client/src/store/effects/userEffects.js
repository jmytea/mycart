import {http, api} from '../../http'
import { put, call, takeLatest } from "redux-saga/effects";

const requestAddGoodsToCart = async(payload)=>{
  const result = await http.post(api.ADD_GOODS_TO_CART_API, payload);
}

// 完整的user/add_goods_to_cart事件
function *fetchAddGoodsToCart({payload}){
  yield call(requestAddGoodsToCart, payload);
}

function *addGoodsToCartEffect(){
  yield takeLatest('user/add_goods_to_cart', fetchAddGoodsToCart);
}
export default [
  addGoodsToCartEffect
];