/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';

/*----------Components----------*/
import Header from 'Header';
import PollList from 'PollList';

/*eslint-disable require-jsdoc*/
export class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      polls: [],
    };
  }
  getPolls() {
    $
      .ajax({url: '/polls', type: 'get'})
      .done((list) => {
        let polls = list.map((poll) => {
          return (
            <div key={poll._id} className='row list-row top-row'>
              <a href={'/poll' + poll._id}>
                <div className='title col-xs-6 col-xs-push-3'>
                  {poll.question.displayName}
                </div>
              </a>
            </div>
          );
        });
        this.setState({polls});
      });
  }
  render() {
    if(this.state.polls.length === 0) this.getPolls();
    return (
      <div>
        <Header />
        <PollList list={this.state.polls} />
      </div>
    );
  }
}

export default connect((state) => state)(Index);
