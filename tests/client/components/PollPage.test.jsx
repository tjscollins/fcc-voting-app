/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
// import {Provider} from 'react-redux';
// import {configure} from 'configureStore';

/*----------Components----------*/
import {PollPage} from 'PollPage';

describe('PollPage', () => {
  it('should exist', () => {
    expect(PollPage).toExist();
  });

  describe('PollPage.ballot', () => {
    it('should render a ballot form', () => {
      let page = ReactTestUtils.renderIntoDocument(<PollPage />);
      let ballot = ReactTestUtils.scryRenderedDOMComponentsWithClass(page, 'ballot');
      expect(ballot.length).toBe(1);
    });
  });

  describe('PollPage.displayPollData', () => {
    it('should render data visualizations of the polling data', () => {
      let page = ReactTestUtils.renderIntoDocument(<PollPage />);
      let data = ReactTestUtils.scryRenderedDOMComponentsWithClass(page, 'data');
      expect(data.length).toBe(1);
    });
  });
});
