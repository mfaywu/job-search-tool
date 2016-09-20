import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Button, Table } from 'react-bootstrap';

import { Jobs } from '../api/jobs.js';
import { Tasks } from '../api/tasks.js';

import Job from './Jobs/Job.jsx';
import AddJob from './Jobs/AddJob.jsx';
import Task from './Tasks/Task.jsx';
import AddTask from './Tasks/AddTask.jsx';

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
        <br/>
        <br/>
        <AddTask />
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Task</th>
              <th>Do by</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.renderTasks() }
          </tbody>
        </Table>

        <AddJob />
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Location</th>
              <th>Tech Stack</th>
              <th>State</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.renderJobs() }
          </tbody>
        </Table>
      </div>
    );
  };
}

HomeTab.propTypes = {
  jobs: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
};