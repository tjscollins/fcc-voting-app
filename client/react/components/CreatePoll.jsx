/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';

/*----------Redux----------*/
import * as actions from 'actions';

/*----------Components----------*/
import Header from 'Header';

/*eslint-disable require-jsdoc*/
export class CreatePoll extends React.Component {
  constructor() {
    super();
    this.submit = this
      .submit
      .bind(this);
  }

  submit(e) {
    e.preventDefault();
    $.ajax({
      url: '/createpoll',
      type: 'post',
      data: JSON.stringify({
        question: {
          displayName: this.refs.pollName.value,
          text: this.refs.pollQuestion.value,
          answers: this
            .refs
            .pollOptions
            .value
            .split(','),
        _creator: this.props.session.data._id,
        },
      }),
      beforeSend: function(req) {
        req.setRequestHeader('Content-type', 'application/json');
      },
    }).done((res, status, jqXHR) => {
      console.log(res);
      window.location.href=`/poll${res._id}`;
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className='container well'>
          <h1 className='title'>New Poll</h1>
          <form onSubmit={this.submit}>
            <div className='form-group'>
              <label htmlFor='pollName'>Name</label>
              <input
                type='text'
                className='form-control'
                ref='pollName'
                id='pollName'
                placeholder='Title' />
            </div>
            <div className='form-group'>
              <label htmlFor='pollQuestion'>Question</label>
              <input
                type='text'
                className='form-control'
                ref='pollQuestion'
                id='pollQuestion'
                placeholder='Question' />
            </div>
            <div className='form-group'>
              <label htmlFor='pollOptions'>Options</label>
              <input
                type='text'
                className='form-control'
                ref='pollOptions'
                id='pollOptions'
                placeholder='Separate Options with Commas' />
            </div>
            <button
              type='submit'
              className='btn btn-default'
              style={{
                float: 'right',
            }}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

CreatePoll.propTypes = {
  dispatch: React.PropTypes.func,
  session: React.PropTypes.object,
};

export default connect((state) => state)(CreatePoll);
