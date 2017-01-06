/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/
import Header from 'Header';

/*eslint-disable require-jsdoc*/
export class Login extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Header />
        <div className='container login'>
          <h1 className=''>Login</h1>
          <a href='/auth/google'>
            <div className='btn btn-default' id='login-btn'>
              <p><i className='fa fa-2x fa-google' /> &nbsp; Login with Google</p>
            </div>
          </a>
          <br /><br />
          <a href='/auth/twitter'>
            <div className='btn btn-info' id='login-btn'>
              <p><i className='fa fa-2x fa-twitter' /> &nbsp; Login with Twitter</p>
            </div>
          </a>
          <br /><br />
          <a href='/auth/twitter'>
            <div className='btn btn-primary' id='login-btn'>
              <p><i className='fa fa-2x fa-facebook' /> &nbsp; Login with Facebook</p>
            </div>
          </a>
          <br /> <br />
          <a href='/auth/github'>
            <div className='btn btn-success' id='login-btn'>
              <p><i className='fa fa-2x fa-github' /> &nbsp; Login with GitHub</p>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
