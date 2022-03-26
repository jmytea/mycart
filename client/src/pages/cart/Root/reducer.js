import { fromJS } from "immutable";
import { SET_CART_DATA, SET_CART_GOODS, DELETE_CART_GOODS} from "./effects";
const initialState = fromJS([]);

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_DATA:
      return fromJS(action.data);
    case SET_CART_GOODS:
      //修改商品的数量或者是选中的状态
      const {type, id, ...rest} = action;
      const index = state.findIndex(item=>item.get('_id')===id);
      let newState = null;
      Object.entries(rest).forEach(([key, value])=>{
        newState = state.setIn([index, key], value);
      });
      return newState;
    case DELETE_CART_GOODS:
      return state.filter(item=>item.get("_id")!==action.id);
    default:
      return state;
  }
};
