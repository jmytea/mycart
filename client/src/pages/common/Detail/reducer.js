import {SET_DETAIL_DATA, SET_DETAIL_LOADING} from './effect'
import {fromJS} from 'immutable'

const initialState = fromJS({
  loading: false,
  data: {}
});

export default (state = initialState, action)=>{
  switch (action.type) {
    case SET_DETAIL_LOADING:
      return state.set('loading', action.value);
    case SET_DETAIL_DATA: 
      return state.set('data', fromJS(action.data));
    default:
      return state;
  }
}