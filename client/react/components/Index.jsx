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
  }
  render() {
    return (
      <div>
        <Header loggedIn={this.props.loggedIn} />
        <PollList />
      </div>
    );
  }
}

Index.propTypes = {
  loggedIn: React.PropTypes.bool,
};

export default connect((state) => state)(Index);
