import {fromJS} from 'immutable';
import {SET_LOGIN_SHOW_INFO, SET_STATUS, SET_LOGIN_STATUS} from './effect'



const initialState = fromJS({
  showInfo: '获取验证码',
  status: 0,//0:正常为发送状态，1:发送了验证码，还没响应。2:发送了验证码并且得到了响应。3:发送失败，需要重新发送
  loginStatus: localStorage.getItem('TOKEN') ? 2 : 0, //0: 未登录，1:正在登录，2:登录成功，3:登录失败
})

export default (state = initialState, action)=>{
  switch (action.type) {
    case SET_LOGIN_SHOW_INFO:
      return state.set('showInfo', action.showInfo);
    case SET_STATUS: 
      return state.set('status', action.status);
    case SET_LOGIN_STATUS:
      return state.set('loginStatus', action.status);
    default:
      return state;
  }
}