/*----------Modules----------*/
import React from 'react';
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
   * loginManager - manages the display of login/logout buttons
   *
   * @return {JSX}  JSX element for login/logout button
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
    dispatch(actions.endSession());
  }
  render() {
    let {dispatch, session} = this.props;
    if(!session.data) $.ajax({
      url: '/api/me',
      type: 'get',
    }).done((data) => {
      if(data._id && !session.data) {
        dispatch(actions.initiateSession('github', data));
      }
    }).fail((err) => {
      console.error(err);
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
          <ul className='nav navbar-nav navbar-right'>
            <li>{this.loginManager()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  session: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default connect((state) => state)(Header);
