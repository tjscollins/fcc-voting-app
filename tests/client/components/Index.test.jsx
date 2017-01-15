/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configureStore from 'configure';

/*----------Components----------*/
import {Index} from 'Index';

describe('Index', () => {
  it('should exist', () => {
    expect(Index).toExist();
  });

  describe('Index.getPolls', () => {
    it('should get polls list from /api/polls', () => {
      let spy = sinon.spy(jQuery, 'ajax');
      let store = configureStore();
      let provider = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <Index />
        </Provider>
      );
      expect(spy.called).toBe(true);
      expect(spy.firstCall.args[0].url).toBe('/api/polls');
      spy.restore();
    });
  });
});
