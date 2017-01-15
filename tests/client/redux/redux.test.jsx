/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
// import React from 'react'; import ReactDOM from 'react-dom'; import
// ReactTestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
// import {Provider} from 'react-redux';
import configure from 'configure';
import * as actions from 'actions';
import {sessionReducer} from 'reducers';

/*----------Components----------*/

describe('redux', () => {
  describe('configureStore', () => {
    it('should create the store', () => {
      let store = configure();
      expect(store.dispatch).toExist();
      expect(store.getState).toExist();
      expect(store.subscribe).toExist();
    });
  });
  describe('actions', () => {
    it('should create INIT_SESSION action', () => {
      let init = {
        type: 'INIT_SESSION',
        service: 'service',
        data: 'data',
      };
      expect(actions.initiateSession('service', 'data')).toEqual(init);
    });

    it('should create END_SESSION action', () => {
      let end = {
        type: 'END_SESSION',
      };

      expect(actions.endSession()).toEqual(end);
    });
  });

  describe('reducers', () => {
    describe('sessionReducer', () => {
      it('should store user SESSION data on INITIATION', () => {
        let init = {
          type: 'INIT_SESSION',
          service: 'service',
          data: 'data',
        };

        expect(sessionReducer({}, init)).toEqual({service: 'service', data: 'data'});
      });

      it('should clear user SESSION data on END', () => {
        let end = {
          type: 'END_SESSION',
        };

        expect(sessionReducer({
          service: 'service',
          data: 'data',
        }, end)).toEqual({service: null, data: null});
      });
    });
  });
});
