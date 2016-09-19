import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Button } from 'react-bootstrap';

import { Jobs } from '../api/jobs.js';
import { Tasks } from '../api/tasks.js';

import Job from './Job.jsx';
import AddJob from './AddJob.jsx';
import Task from './Task.jsx';
import AddTask from './AddTask.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  renderJobs() {
    return this.props.jobs.map((job) => (
      <Job key={job._id} job={job} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Job Search Tool</h1>
          <AccountsUIWrapper />

        </header>
        { this.props.currentUser ?
          <div>

            <AddTask />
            <table>
              <tbody>
                <th>Task</th>
                <th>Do by</th>
                <th></th>
                { this.renderTasks() }
              </tbody>
            </table>


            <AddJob />
            <table>
              <tbody>
                <th>Company</th>
                <th>Position</th>
                <th>Location</th>
                <th>Tech Stack</th>
                <th>State</th>
                <th></th>
                <th></th>
                { this.renderJobs() }
              </tbody>
            </table>
          </div> : ''
        }
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