/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/


/*eslint-disable require-jsdoc*/
export class RouteContainer extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
  );
  }
}

RouteContainer.propTypes = {
  children: React.PropTypes.object,
};

export default RouteContainer;
