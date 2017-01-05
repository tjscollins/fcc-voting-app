/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
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
    it('should render Login button if user is not logged in', ()=>{
      let header = ReactTestUtils.renderIntoDocument(<Header loggedIn />);
      let button = ReactTestUtils.scryRenderedDOMComponentsWithClass(header, 'btn-primary');

      expect(button.length).toBe(1);
      expect(button[0].innerHTML).toBe('Logout');
    });

    it('should render the Logout button if the user is logged in', () => {
      let header = ReactTestUtils.renderIntoDocument(<Header loggedIn={false} />);
      let button = ReactTestUtils.scryRenderedDOMComponentsWithClass(header, 'btn-primary');

      expect(button.length).toBe(1);
      expect(button[0].innerHTML).toBe('Login');
    });
  });
});
