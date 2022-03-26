import {call, put, takeLatest} from 'redux-saga/effects'
import { api, http } from '../../http';

export const SET_CONFIRM_STATUS = 'order/set_confirm_order_status';

const setConfirmOrderStatus = (status)=>({
  type: SET_CONFIRM_STATUS,
  status
})

const requestConfirmOrder = async (params)=>{
  const result = await http.post(api.CONFIRM_ORDER_API, params);
  console.log(result);
  return result;
}

function *fetchConfirmOrder({orders, pay}){
  yield put(setConfirmOrderStatus(1));
  yield call(requestConfirmOrder, {orders, pay});
  yield put(setConfirmOrderStatus(2));
}

function *confirmOrderEffect(){
  yield takeLatest('order/fetch_confirm_order', fetchConfirmOrder);
}
export default [
  confirmOrderEffect
]