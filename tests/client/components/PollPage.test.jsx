/*global describe it sinon*/

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

  it('should call $.ajax to fetch ballot and data', () => {
    let $expectation = sinon.mock(jQuery).expects('ajax').atLeast(2);
    let store = configureStore();
    let page = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <PollPage />
      </Provider>
    );
    $expectation.verify();
  });

  describe('PollPage.ballot', () => {
    it('should render a ballot form', () => {
      let store = configureStore();
      let provider = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <PollPage />
        </Provider>
      );
      let pollPage = ReactTestUtils.scryRenderedComponentsWithType(provider, PollPage)[0];
      pollPage.ballot({
        _id: '1234', question: {
          displayName: 'Name',
          text: 'Text',
          answers: ['Ans1', 'Ans2', 'Ans3', 'Ans4'],
        }, responses: {
          answers: [0, 5, 2, 1],
        },
      });
      let ballot = ReactTestUtils.scryRenderedDOMComponentsWithClass(pollPage, 'ballot');
      let form = ReactTestUtils.findRenderedDOMComponentWithTag(pollPage, 'form');
      expect(ballot.length).toBe(1);
      expect(form.length).toBe(5); // Number of Answers + 1 Submit button
    });
  });

  describe('PollPage.displayPollData', () => {
    it('should render data visualizations of the polling data', () => {
      let store = configureStore();
      let provider = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <PollPage />
        </Provider>
      );
      let pollPage = ReactTestUtils.scryRenderedComponentsWithType(provider, PollPage)[0];
      pollPage.displayPollData({
        _id: '1234', question: {
          displayName: 'Name',
          text: 'Text',
          answers: ['Ans1', 'Ans2', 'Ans3', 'Ans4'],
        }, responses: {
          answers: [0, 5, 2, 1],
        },
      });
      let data = ReactTestUtils.scryRenderedDOMComponentsWithClass(provider, 'data');
      expect(data.length).toBe(1);
    });
  });
});
