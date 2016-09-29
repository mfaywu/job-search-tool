import React, { Component, PropTypes } from 'react';
import EditJob from './EditJob.jsx';
import { Meteor } from 'meteor/meteor';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'

import { Jobs } from '../../api/jobs.js';

// Job component - represents a single job
export default class Job extends Component {
  deleteThisJob() {
    Meteor.call('jobs.remove', this.props.job._id);
  }

  nothing() {
    //do nothing
  }

  renderTasks() {
    if (this.props.job.job_tasks) {
      return this.props.job.job_tasks.map((task) => (
        <li>task</li>
      ));
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.job.company}</td>
        <td><TagsInput disabled={true} value={this.props.job.positions ? this.props.job.positions : []} onChange={this.nothing.bind(this) }/></td>
        <td><TagsInput disabled={true} value={this.props.job.locations ? this.props.job.locations : []} onChange={this.nothing.bind(this) }/></td>
        <td><TagsInput disabled={true} value={this.props.job.tech_stack ? this.props.job.tech_stack : []} onChange={this.nothing.bind(this) }/></td>
        <td><TagsInput disabled={true} value={this.props.job.pros ? this.props.job.pros : []} onChange={this.nothing.bind(this) }/></td>
        <td><TagsInput disabled={true} value={this.props.job.cons ? this.props.job.cons : []} onChange={this.nothing.bind(this) }/></td>
        <td><TagsInput disabled={true} value={this.props.job.links ? this.props.job.links : []} onChange={this.nothing.bind(this) }/></td>
        <td>{this.props.job.state}</td>
        <td><EditJob job={this.props.job}/></td>
        <td>
          <button className="delete" onClick={this.deleteThisJob.bind(this) }>
            &times;
          </button>
        </td>
        <td>{this.renderTasks() }</td>
      </tr>
    );
  }
}

Job.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  job: PropTypes.object.isRequired,
};