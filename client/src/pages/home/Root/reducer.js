import { api, http } from "../../../http";
import {  fromJS } from "immutable";

// type
const SET_HOME_DATA = "home/setHomeData";
const SET_HOME_LOADING = "home/setHomeLoading";

// 初始state
const initialState = fromJS({
  banner: [],
  cate: [],
  newGoods: [],
  loading: false,
});

// 同步事件
const setHomeData = (data) => ({
  type: SET_HOME_DATA,
  ...data,
});

const setHomeLoading = (value) => ({
  type: SET_HOME_LOADING,
  value,
});

// 异步事件
export const requestHomeData = () => async (dispatch) => {
  dispatch(setHomeLoading(true));
  const data = await http.get(api.HOME_API);
  dispatch(setHomeData(data));//将原生的js类型转为了immutable类型
  dispatch(setHomeLoading(false));
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_DATA:
      return state
        .set("banner", fromJS(action.bannerData))
        .set("cate", fromJS(action.cateData))
        .set("newGoods", fromJS(action.newGoodsData));
    case SET_HOME_LOADING:
      return state.set('loading', action.value);
    default:
      return state;
  }
};

export default reducer;
