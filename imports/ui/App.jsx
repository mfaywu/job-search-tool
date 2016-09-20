import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Navbar, Tabs, Tab, Button } from 'react-bootstrap';

import { Jobs } from '../api/jobs.js';
import { Tasks } from '../api/tasks.js';

import HomeTab from './HomeTab.jsx';
import Welcome from './Welcome.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Job Search Tool</a>
            </Navbar.Brand>
            <AccountsUIWrapper />
          </Navbar.Header>
        </Navbar>
        <div className="container">

          <Tabs defaultActiveKey={1}>
            <Tab eventKey={1} title="Home">
              { this.props.currentUser ?
                <HomeTab jobs={this.props.jobs} tasks={this.props.tasks} />
                : 
                <Welcome />
              }
            </Tab>
            <Tab eventKey={2} title="Interview Prep">Interview Prep</Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  jobs: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('jobs');
  Meteor.subscribe('tasks');
  return {
    jobs: Jobs.find({}, { sort: { createdAt: -1 } }).fetch(),
    tasks: Tasks.find({}, { sort: { date: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);