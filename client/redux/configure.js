import * as redux from 'redux';
import thunk from 'redux-thunk';
import {sessionReducer} from 'reducers';

const configure = (initialState = {}) => {
  let combinedReducer = redux.combineReducers({
    session: sessionReducer,
  });
  let store = redux.createStore(combinedReducer, initialState, redux.compose(redux.applyMiddleware(thunk), window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f));
  return store;
};

export default configure;
