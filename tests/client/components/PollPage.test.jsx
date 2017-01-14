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
import {PollPage} from 'PollPage';

describe('PollPage', () => {
  it('should exist', () => {
    expect(PollPage).toExist();
  });

  describe('PollPage.ballot', () => {
    it('should render a ballot form', () => {
      let store = configureStore();
      let page = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <PollPage />
        </Provider>
      );
      let ballot = ReactTestUtils.scryRenderedDOMComponentsWithClass(page, 'ballot');
      expect(ballot.length).toBe(1);
    });
  });

  describe('PollPage.displayPollData', () => {
    it('should render data visualizations of the polling data', () => {
      let store = configureStore();
      let page = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <PollPage />
        </Provider>
      );
      let data = ReactTestUtils.scryRenderedDOMComponentsWithClass(page, 'data');
      expect(data.length).toBe(1);
    });
  });
});
