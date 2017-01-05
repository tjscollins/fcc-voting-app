/*----------React----------*/
import React from 'react';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';

/*----------Components----------*/
import Index from 'Index';
import Login from 'Login';
import RouteContainer from 'RouteContainer';
import PollPage from 'PollPage';
import Profile from 'Profile';

/**
 * Component Class to Route within SPA
 */
class Routes extends React.Component {
/**
 * render - standard render method
 *
 * @return {JSX}
 */
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={RouteContainer}>
          <IndexRoute component={Index} />
          <Route path='login' component={Login} />
          <Route path='profile' component={Profile} />
          <Route path='poll*' component={PollPage} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
