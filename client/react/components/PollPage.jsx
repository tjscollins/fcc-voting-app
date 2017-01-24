/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';

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
      poll: {
        question: {
          answers: []
        },
        responses: {
          answers: []
        }
      },
      newOption: null
    };
  }

  /**
   * deleteButton - render a delete button if the poll belongs to the logged in user
   *
   * @return {JSX}  Button element
   */
  deleteButton() {
    let {session} = this.props;
    if (session.data && session.data._id === this.state.poll.question._creator)
      return <button
        onClick={this
        .deletePoll
        .bind(this)}
        className='btn btn-danger form-control'>Delete</button>;
    }

  deletePoll() {
    let ajaxOptions = {
      type: 'delete',
      url: `/api/poll${this.state._id}`
    };
    console.log('Deleting ', this.state._id);
    $
      .ajax(ajaxOptions)
      .done((res, status) => {
        window.location.href = '/profile';
      });
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
      }
    };
    $
      .ajax(ajaxOptions)
      .done((res, status) => {
        this.setState({
          poll: {
            question: {
              answers: []
            },
            responses: {
              answers: []
            }
          },
          displayBallot: false
        });
        this.refs.newOption.value = '';
      });
  }

  render() {
    if (!this.state.displayBallot)
      $.ajax({
        url: `/api/poll${this.state._id}`,
        type: 'get',
        success: (poll) => {
          this.setState({poll, displayBallot: true});
        }
      });
    if (this.state.poll) {
      $('#plot').remove();
      plot(this.state.poll.question.answers, this.state.poll.responses.answers, {radius: 100});
    }
    let {answers, displayName, text} = this.state.poll.question;

    // Load Twitter Code
    window.twttr = (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id))
        return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs
        .parentNode
        .insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t
          ._e
          .push(f);
      };

      return t;
    }(document, "script", "twitter-wjs"));

    return (
      <div>
        <Header/>
        <div className='container well poll-box'>
          <div className='row'>
            <div className='col-xs-12 col-sm-5'>
              <div className='ballot'>
                <h4>{displayName}</h4>
                <form
                  onSubmit={this
                  .submitVote
                  .bind(this)}>
                  <div className='form-group'>
                    <p>{text}</p>
                  </div>
                  <div className='form-group'>
                    {answers.map((ans, i) => {
                      return (
                        <div key={`ans-${i}`}>
                          <input
                            value={`${i}`}
                            name='answers'
                            id={`ans-${i}-id`}
                            type='radio'
                            autoComplete='off'
                            checked={this.state.choice === `${i}`}
                            onClick={() => {
                            this.setState({choice: `${i}`, displayBallot: false});
                          }}/>
                          <label htmlFor={`ans-${i}-id`}>{ans}</label>
                        </div>
                      );
                    })}
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      ref='newOption'
                      placeholder='New Option'
                      className='form-control'/>
                  </div>
                  <button className='btn btn-default form-control' type='submit'>Submit</button>
                </form>
              </div>
              <br/>
              <a
                target='_blank'
                className="twitter-share-button"
                href={`https://twitter.com/intent/tweet?text=Check%20Out%20My%20Poll%20${window.location.href}`}>
                <i className='fa fa-twitter'></i>
              </a>
            </div>
            <div className='col-xs-12 col-sm-7'>
              <div className='data'>
                <h4 className='poll-results'>Poll Results</h4>
                <div id='chart' className='poll-chart'/> {this
                  .deleteButton
                  .call(this)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PollPage.propTypes = {
  session: React.PropTypes.object
};

export default connect((state) => state)(PollPage);
