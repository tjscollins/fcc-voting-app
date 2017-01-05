/*----------Modules----------*/
import React from 'react';

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
    if(this.props.loggedIn) {
      return (
        <a href='/logout'><button className='btn btn-primary'>Logout</button></a>
      );
    } else {
      return (
        <a href='/login'><button className='btn btn-primary'>Login</button></a>
      );
    }
  }
  render() {
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
  loggedIn: React.PropTypes.bool,
};

export default Header;
