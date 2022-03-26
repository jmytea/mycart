import { api, http } from '../../../../http'
import {fromJS} from "immutable"

const SET_CATE_LIST_DATA = 'cate/setListDataById';
const SET_CATE_LIST_LOADING = 'cate/setListLoading';


const initialState = fromJS({
  menuListData: {},
  loading: false
});

// 同步任务
const setListDataById = ({id, list})=>({
  type: SET_CATE_LIST_DATA,
  id: id,
  list: list
})

const setListLoading = (value)=>({
  type: SET_CATE_LIST_LOADING,
  value
})

// 异步任务
export const requestListDataById = (id) => async(dispatch)=>{
  dispatch(setListLoading(true));
  const result = await http.get(api.CATE_LIST_API, {id});
  dispatch(setListDataById({id, list: fromJS(result.listData)}));//将请求回来的数据，为原始的js类型，转为immutable类型
  dispatch(setListLoading(false));
}


// reducer
export default (state = initialState, action)=>{
  switch (action.type) {
    case SET_CATE_LIST_DATA: 
      return state.setIn(['menuListData', action.id], action.list);
    case SET_CATE_LIST_LOADING: 
    return state.set('loading', action.value)
    default:
      return state;
  }
}