/*----------Modules----------*/
import React, {PropTypes as PT} from 'react';
import {connect} from 'react-redux';

/*----------Redux----------*/
import * as actions from 'actions';

/*----------Components----------*/


/*eslint-disable require-jsdoc*/
export class Header extends React.Component {
  constructor() {
    super();
  }

  /**
   * loginManager - manages the display of logout buttons
   *
   * @return {JSX}  JSX element for logout button
   */
  loginManager() {
    if(this.props.session.data) {
      return (
        <a href='/logout'><button onClick={this.logout} className='btn btn-primary'>Logout</button></a>
      );
    } else {
      return (
        <div />
      );
    }
  }

  /**
   * logout - dispatch action to clear userSession data
   *
   */
  logout() {
    this.props.dispatch(actions.endSession());
  }

  /**
   * userUI - Generates header links for user ui
   *
   * @return {JSX}  Header Links for User UI
   */
  userUI() {
    if(this.props.session.data) {
      return (
        <li>
          <a href='/profile'>View My Polls</a>
        </li>
          );
    } else {
      return (<div />);
    }
  }

  render() {
    let {dispatch, session} = this.props;
    if(!session.data) $.ajax({
      url: '/api/me',
      type: 'get',
      success: (data) => {
        if(data._id && !session.data) {
          dispatch(actions.initiateSession('github', data));
        }
      },
      failure: (err) => {
        console.error(err);
      },
    });
    return (
      <nav id='Header' className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <a className='navbar-brand' href='/' onClick={this.hide}>
            <i className='fa fa-check-square-o' aria-hidden='true' />VoteNow! &nbsp;
          </a>

          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar-collapse' aria-expanded='false'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar' />
            <span className='icon-bar' />
            <span className='icon-bar' />
          </button>
        </div>
        <div className='collapse navbar-collapse' id='navbar-collapse'>
          <ul className='nav navbar-nav navbar-left'>
            <li className=''><a href='/createpoll'>Create Poll</a></li>
            {this.userUI()}
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li>{this.loginManager()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  session: PT.object,
  dispatch: PT.func,
};

export default connect((state) => state)(Header);
