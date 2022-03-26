import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import effects from './effects'
import reducer from './reducer'




// 创建saga
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 作用saga
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

// 运行saga的任务
effects.forEach(effect=>sagaMiddleware.run(effect));



export default store;
