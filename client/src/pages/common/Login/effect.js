import {api, http} from "../../../http"
import {call, put, takeLatest} from 'redux-saga/effects'


/*********⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️以下是发送验证码的代码⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️*****************/
export const SET_LOGIN_SHOW_INFO = 'login/setShowInfo';
export const SET_STATUS = 'login/setStatus';

// 同步任务
const setShowInfo = (showInfo)=>({
  type: SET_LOGIN_SHOW_INFO,
  showInfo
})

const setStatus = (status)=>({
  type: SET_STATUS,
  status
})

// 倒计时
const timer = (count)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve(count-1);
    }, 1000);
  })
}

// 异步任务
const requestSendCode = async (tel)=>{
  const {code} = await http.post(api.LOGIN_SEND_CODE_API, {tel});
  return code;
}

// 整体的任务
function *fetchSendCode({tel}){
  yield put(setStatus(1));
  yield put(setShowInfo('正在发送'));
  // 发送验证码
  const result = yield call(requestSendCode, tel);
  if(result !== 0){
    yield put(setShowInfo('重新发送'));
    yield put(setStatus(3));
    return;
  }

  yield put(setStatus(2));


  // 设置初始值开始倒计时
  let count = 60;
  // 设置数据：60s
  yield put(setShowInfo(count+'s'));

  // 启动倒计时
  while(count > 0){
    count = yield call(timer, count);//count=count-1,进行递减
    // 设置数据5
    yield put(setShowInfo(count+'s'));
  }

  // 倒计时结束
  yield put(setShowInfo('重新发送'));
  yield put(setStatus(0));
  
}

function *sendCodeEffect(){
  yield takeLatest('login/send_code', fetchSendCode);
}


/*********⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️以下是验证验证码的代码⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️*****************/

export const SET_LOGIN_STATUS = 'login/set_login_status';

const setLoginStatus = (status)=>({
  type: SET_LOGIN_STATUS,
  status
})

const requestCheckCode = async (tel, telCode)=>{
  const {code, data} = await http.post(api.LOGIN_CHECK_CODE_API, {tel, code: telCode});
  return {code, data};
}

function *fetchCheckCode({tel, code}){
  // 正在登录
  yield put(setLoginStatus(1));
  const result = yield call(requestCheckCode, tel, code);
  if(result.code === 0){
    // 保存token
    localStorage.setItem('TOKEN', result.data.token);
    //登录成功
    yield put(setLoginStatus(2));
  }else{
    //登录失败
    yield put(setLoginStatus(3));
  }
}

function *checkCodeEffect(){
  yield takeLatest('login/check_code', fetchCheckCode);
}


/*********⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️以下是检查登录是否过期的代码⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️*****************/

// 异步请求，检查登录是否过期
const requestCheckLogin = async ()=>{
  const result = await http.get(api.LOGIN_CHECK_LOGIN_API);
  return result.code;
}

function *fetchCheckLogin(){
  const code = yield call(requestCheckLogin);
  if(code === 0){
    // 没有过期
  }else{
    //过期了,设置登录状态为0，没登录
    yield put(setLoginStatus(0));
    localStorage.removeItem('TOKEN');
  }
} 

function *checkLoginEffect(){
  yield takeLatest('login/check_login', fetchCheckLogin);
}


export default [sendCodeEffect, checkCodeEffect, checkLoginEffect];