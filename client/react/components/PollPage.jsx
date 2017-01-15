/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/
import Header from 'Header';

/*eslint-disable require-jsdoc*/
export class PollPage extends React.Component {
  constructor() {
    super();
    let id = () => {
      // Returns mocked value for karma testing purposes if pathname doesn't match
      return window
        .location
        .pathname
        .match(/poll([\d\w]+)$/) || [null, '1234'];
    };
    this.state = {
      _id: id()[1],
      ballot: (
        <div className='ballot'>
          Ballot
        </div>
      ),
      data: (
        <div className='data'>
          POLL PAGE
        </div>
      ),
      displayBallot: false,
      displayData: false,
      voted: false,
    };
  }

  /**
   * ballot - render ballot form for user to vote in current poll
   *
   * @param  {Object} poll object from MongoDB
   */
  ballot(poll) {
    // console.log(poll);
    let {answers, displayName, text} = poll.question;
    let ballot = (
      <div className='ballot'>
        <h4>{displayName}</h4>
        <form onSubmit={this.submitVote}>
          <div className='form-group'>
            <p>{text}</p>
          </div>
          <div className='form-group'>
            {answers.map((ans, i) => {
              return (
                <div key={`ans-${i}`}>
                  <input name='answers' id={`ans-${i}-id`} type='radio' autoComplete='off' />
                  <label htmlFor={`ans-${i}-id`}>{ans}</label>
                </div>
              );
            })}
          </div>
          <button className='btn btn-default form-control' type='submit'>Submit</button>
        </form>
      </div>
    );
    if (!this.state.displayBallot)
      this.setState({ballot, displayBallot: true});
    }

  /**
   * displayPollData - render the poll data displaying current results of that poll
   *
   * @param  {Object} poll object from MongoDB
   */
  displayPollData(poll) {
    let {responses} = poll.question;
    let pollData = (
      <div className='data'>
        POLL PAGE: {this.state._id}
      </div>
    );
    if (!this.state.displayData)
      this.setState({data: pollData, displayData: true});
    }

  submitVote(e) {
    e.preventDefault();
    console.log('Submitting Your Vote!');
  }

  render() {
    if (!this.state.displayData && !this.state.displayBallot)
    $
      .ajax({url: `/api/poll${this.state._id}`, type: 'get', success: (list) => {
        this.ballot(list);
        this.displayPollData(list);
      }});
    return (
      <div>
        <Header />
        <div className='container well poll-box'>
          <div className='row'>
            <div className='col-xs-12 col-sm-5'>
              {this.state.ballot}
            </div>
            <div className='col-xs-12 col-sm-7'>
              {this.state.data}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PollPage;
