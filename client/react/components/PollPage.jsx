/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/
import Header from 'Header';


/*eslint-disable require-jsdoc*/
export class PollPage extends React.Component {
  constructor() {
    super();
  }

  /**
   * ballot - render ballot form for user to vote in current poll
   *
   * @return {JSX}  Ballot element
   */
  ballot() {
    return (
      <div>
        Ballot
      </div>
    );
  }

  /**
   * displayPollData - render the poll data displaying current results of that poll
   *
   * @return {JSX}  Element to display current poll data
   */
  displayPollData() {
    return (
      <div>
        POLL PAGE: {window.location.pathname.match(/(\d+)$/)[0]}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header loggedIn={false} />
        <div className='container well poll-box'>
          <div className='row'>
            <div className='col-xs-12 col-sm-4'>
              {this.ballot()}
            </div>
            <div className='col-xs-12 col-sm-8'>
              {this.displayPollData()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PollPage;
