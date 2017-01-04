/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/


/*eslint-disable require-jsdoc*/
export class Header extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <nav className='nav navbar-default navbar-static-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <p className='navbar-brand'>
              <i className='fa fa-check-square-o' aria-hidden='true' />
              &nbsp; VoteNow!
            </p>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
