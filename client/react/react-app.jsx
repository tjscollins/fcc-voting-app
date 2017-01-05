/*----------React----------*/
import React from 'react';
import ReactDOM from 'react-dom';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import * as actions from 'actions';
import * as reducers from 'reducers';
import configureStore from 'configure';

/*----------Components----------*/
import Routes from 'Routes';

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>, document.getElementById('react-app'));
