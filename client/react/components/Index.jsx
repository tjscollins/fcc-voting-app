/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/
import Header from 'Header';
import PollList from 'PollList';


/*eslint-disable require-jsdoc*/
export class Index extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Header />
        <PollList />
      </div>
    );
  }
}

export default Index;
