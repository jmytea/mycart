import {fromJS} from 'immutable'
import {SET_CONFIRM_STATUS} from '../effects/orderEffects'

const initialState = fromJS({
  confirmOrderStatus: 0 //0:进入了确认订单页面，1:正在提交订单。2:提交成功

})

export default (state = initialState, action)=>{
  switch (action.type) {
    case SET_CONFIRM_STATUS:
      return state.set('confirmOrderStatus', action.status);
    default:
      return state;
  }
}