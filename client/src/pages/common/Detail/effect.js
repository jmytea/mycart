import {api, http} from '../../../http'
import {put, call, takeLatest} from 'redux-saga/effects'

// 任务名
export const FETCH_DETAIL_BY_ID = 'detail/fetchDetailById';
export const SET_DETAIL_DATA = 'detail/setDetailData';
export const SET_DETAIL_LOADING = 'detail/setDetailLoading';

const setLoading = (value)=>({
  type: SET_DETAIL_LOADING,
  value
})

const setDetailData = (data)=>({
  type: SET_DETAIL_DATA,
  data
})

// 异步任务
const requestDetailData = async(id)=>{
  const result = await http.get(api.GOODS_DETAIL_API, {id});
  return result;
}

// 完整的任务
function *fecthDetail({id}){
  yield put(setLoading(true));
  // 请求数据
  const data = yield call(requestDetailData, id);
  console.log(data);

  // 设置数据
  yield put(setDetailData(data));
  yield put(setLoading(false));
}



// effect
function *effect(){
  yield takeLatest(FETCH_DETAIL_BY_ID, fecthDetail);
}

export default [effect];
