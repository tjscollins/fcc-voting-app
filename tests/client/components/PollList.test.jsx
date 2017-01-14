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
import {PollList} from 'PollList';

describe('PollList', () => {
  it('should exist', () => {
    expect(PollList).toExist();
  });

  // describe('PollList.buildList', () => {
  //   it('should return a bootstrap container with list-rows', () => {
  //     let list = ReactTestUtils.renderIntoDocument(<PollList />);
  //     let containerFluid = ReactTestUtils.scryRenderedDOMComponentsWithClass(list, 'container-fluid');
  //     let listRows = ReactTestUtils.scryRenderedDOMComponentsWithClass(list, 'list-row');
  //     expect(containerFluid.length).toBe(1);
  //     expect(listRows.length).toBeGreaterThanOrEqualTo(1);
  //   });
  // });
});
