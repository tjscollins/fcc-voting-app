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
import {CreatePoll} from 'CreatePoll';

describe('CreatePoll', () => {
  it('should exist', () => {
    expect(CreatePoll).toExist();
  });

  describe('CreatePoll.submit', () => {
    it('should submit a new poll to /createpoll', () => {
      let provider = ReactTestUtils.renderIntoDocument(
        <Provider store={configureStore()}>
          <CreatePoll />
        </Provider>);
      let createPoll = ReactTestUtils.findRenderedComponentWithType(provider, CreatePoll);
      let submit = ReactTestUtils.findRenderedDOMComponentWithClass(createPoll, 'btn-default');
      createPoll.refs.pollName.value='Name';
      createPoll.refs.pollQuestion.value='Question';
      createPoll.refs.pollOptions.value='One,Two,Three';
      let spy = sinon.spy(jQuery, 'ajax');
      ReactTestUtils.Simulate.submit(submit);
      expect(spy.called).toBe(true);
      expect(spy.firstCall.args[0].url).toBe('/createpoll');
      expect(spy.firstCall.args[0].data).toBe(JSON.stringify({
        question: {
          displayName: 'Name',
          text: 'Question',
          answers: ['One', 'Two', 'Three'],
        },
      }));
      spy.restore();
    });
  });
});
