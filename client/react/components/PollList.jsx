/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/


/*eslint-disable require-jsdoc*/
export class PollList extends React.Component {
  constructor() {
    super();
  }
  buildList() {
    return (
      <div className='container-fluid inner-list'>
        <div className='row list-row top-row'>
          <div className='title col-xs-6 col-xs-push-3'>
            <a href='/poll1234'>Test</a>
          </div>
        </div>
        <div className='row list-row'>
          <div className='title col-xs-6 col-xs-push-3'>
            Test
          </div>
        </div>
        <div className='row list-row bottom-row'>
          <div className='title col-xs-6 col-xs-push-3'>
            Test
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className='container well poll-list'>
        <div className='row'>
          <h1 className='title'>Active Polls</h1>
        </div>
        <div className='row'>
          {this.buildList()}
        </div>
      </div>
  );
  }
}

export default PollList;
