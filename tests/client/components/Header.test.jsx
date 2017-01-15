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
import {Header} from 'Header';

describe('Header', () => {
  it('should exist', () => {
    expect(Header).toExist();
  });

  describe('Header.loginManager', () => {
    it('should NOT render a button if user is not logged in', ()=>{
      let header = ReactTestUtils.renderIntoDocument(<Header session={{data: false}} />);
      let button = ReactTestUtils.scryRenderedDOMComponentsWithClass(header, 'btn-primary');

      expect(button.length).toBe(0);
    });

    it('should render the Logout button if the user is logged in', () => {
      let header = ReactTestUtils.renderIntoDocument(<Header session={{data: true}} />);
      let button = ReactTestUtils.scryRenderedDOMComponentsWithClass(header, 'btn-primary');

      expect(button.length).toBe(1);
      expect(button[0].innerHTML).toBe('Logout');
    });
  });

  describe('Header.logout', () => {
    it('should dispatch a logout action', () => {
      let spy = sinon.spy();
      let header = ReactTestUtils.renderIntoDocument(<Header session={{data: true}} dispatch={spy} />);
      header.logout();
      expect(spy.calledWith({type: 'END_SESSION'})).toBe(true);
    });
  });
});
