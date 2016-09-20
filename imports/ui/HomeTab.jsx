import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Button } from 'react-bootstrap';

import { Jobs } from '../api/jobs.js';
import { Tasks } from '../api/tasks.js';

import Job from './Job.jsx';
import AddJob from './AddJob.jsx';
import Task from './Task.jsx';
import AddTask from './AddTask.jsx';

export default class HomeTab extends Component {
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
      </div>
    );
  };
}

HomeTab.propTypes = {
  jobs: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
};