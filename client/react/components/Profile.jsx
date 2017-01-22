/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';

/*----------Components----------*/
import Header from 'Header';
import PollList from 'PollList';

/*eslint-disable require-jsdoc*/
export class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      polls: [],
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if(!Object.is(nextProps.session, this.props.session)) {
      this.getPolls(nextProps);
    }
  }
  getPolls(props) {
    $
      .ajax({url: '/api/polls', type: 'get'})
      .done((list) => {
        let polls = list.filter((poll) => {
          return poll.question._creator === props.session.data._id;
        }).map((poll) => {
          return (
            <div key={`getPolls-${poll._id}`} className='row list-row top-row'>
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
    return (
      <div>
        <Header />
        <PollList title={'My Polls'} list={this.state.polls} />
      </div>
      );
  }
}

Profile.propTypes = {
  session: React.PropTypes.object,
};

export default connect((state) => state)(Profile);
