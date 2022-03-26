import {call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import {api, http} from '../../../http'


// 以下是获得购物车全部数据的代码
export const SET_CART_DATA = 'cart/set_cart_data';

const setCartData = (data)=>({
  type: SET_CART_DATA,
  data
})

const requestCartData = async ()=>{
  const result = await http.get(api.GET_CART_DATA_API);
  return result;
}

function *fetchCartData(){
  const result = yield call(requestCartData);
  yield put(setCartData(result.data));
}

function *getCartDataEffect(){
  yield takeLatest('cart/get_cart_data', fetchCartData);
}

// 以下是修改购物车中商品数量的代码

export const SET_CART_GOODS = 'cart/set_cart_goods';

const modifyCartGoods = (data)=>({
  ...data,
  type: SET_CART_GOODS
});

const requestModifyCartGoods = async(params)=>{
  const result = await http.post(api.CART_GOODS_MODIFY_API, params);
  return result;
}

function *fecthModifyCartGoods({type, ...rest}){
  // 修改服务器的数据
  yield call(requestModifyCartGoods, rest);
  // 方式1:再次请求整个购物车数据
  // yield call(fetchCartData);
  // 方式2:自己修改本地数据
  yield put(modifyCartGoods(rest));
}

function *modifyCartGoodsEffect(){
  yield takeEvery('cart/modify_cart_goods', fecthModifyCartGoods);
}

// 以下是删除购物车中的商品代码

export const DELETE_CART_GOODS = 'cart/delete_cart_goods'; 
const deleteCartGoods = (id)=>({
  id,
  type: DELETE_CART_GOODS
});

const requestDeleteCartGoods = async (id)=>{
  const result =  await http.get(api.CART_GOODS_DELETE_API, {id});
  return result;
}

function *fetchdeleteCartGoods({id}){
  yield call(requestDeleteCartGoods, id);
  yield put(deleteCartGoods(id));
}

function *deleteCartGoodsEffect(){
  yield takeEvery('cart/fetch_delete_cart_goods', fetchdeleteCartGoods);
}

export default [
  getCartDataEffect,
  modifyCartGoodsEffect,
  deleteCartGoodsEffect
];