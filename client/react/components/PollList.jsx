/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/

/*eslint-disable require-jsdoc*/
export class PollList extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className='container well poll-list'>
        <div className='row'>
          <h1 className='title'>{this.props.title}</h1>
        </div>
        <div className='row'>
          <div className='container-fluid inner-list'>
            {this.props.list}
          </div>
        </div>
      </div>
    );
  }
}

PollList.propTypes = {
  list: React.PropTypes.array,
  title: React.PropTypes.string,
};

export default PollList;
