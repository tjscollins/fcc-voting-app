/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/
import Header from 'Header';
import plot from 'PollPlot';

/*eslint-disable require-jsdoc*/
export class PollPage extends React.Component {
  constructor() {
    super();
    let id = () => {
      // Returns mocked value for testing purposes if pathname doesn't match regex
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
      choice: null,
      data: (
        <div className='data'>
          POLL PAGE
        </div>
      ),
      displayBallot: false,
      voted: false,
      poll: {question: {answers: []}, responses: {answers: []}},
      newOption: null,
    };
  }

  /**
   * submitVote - Sends vote data to MongoDB
   *
   * @param  {event} e Form submit event
   */
  submitVote(e) {
    e.preventDefault();
    let choice = this.refs.newOption.value || this.state.choice;
    let ajaxOptions = {
        type: 'post',
        url: `/api/vote${this.state._id}`,
        data: JSON.stringify({choice, n: this.state.poll.question.answers.length}),
        beforeSend: function(req) {
          req.setRequestHeader('Content-type', 'application/json');
        },
      };
    $.ajax(ajaxOptions).done((res, status) => {
      this.setState({poll: {question: {answers: []}, responses: {answers: []}}, displayBallot: false});
      this.refs.newOption.value='';
    });
  }

  render() {
    if (!this.state.displayBallot)
    $
      .ajax({url: `/api/poll${this.state._id}`, type: 'get', success: (poll) => {
        this.setState({poll, displayBallot: true});
      }});
    if(this.state.poll) {
      $('#plot').remove();
      plot(this.state.poll.question.answers,
          this.state.poll.responses.answers,
          {
            radius: 100,
          });
        }
    let {answers, displayName, text} = this.state.poll.question;
    return (
      <div>
        <Header />
        <div className='container well poll-box'>
          <div className='row'>
            <div className='col-xs-12 col-sm-5'>
              <div className='ballot'>
                <h4>{displayName}</h4>
                <form onSubmit={this.submitVote.bind(this)}>
                  <div className='form-group'>
                    <p>{text}</p>
                  </div>
                  <div className='form-group'>
                    {answers.map((ans, i) => {
                      return (
                        <div key={`ans-${i}`}>
                          <input value={`${i}`} name='answers' id={`ans-${i}-id`} type='radio'
                            autoComplete='off' checked={this.state.choice === `${i}`} onClick={() => {
                              this.setState({choice: `${i}`, displayBallot: false});
                            }} />
                          <label htmlFor={`ans-${i}-id`}>{ans}</label>
                        </div>
                      );
                    })}
                  </div>
                  <div className='form-group'>
                    <input type='text' ref='newOption' placeholder='New Option' className='form-control' />
                  </div>
                  <button className='btn btn-default form-control' type='submit'>Submit</button>
                </form>
              </div>
            </div>
            <div className='col-xs-12 col-sm-7'>
              <div className='data'>
                <h4 className='poll-results'>Poll Results</h4>
                <div id='chart' className='poll-chart' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PollPage;
