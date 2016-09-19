import React, { Component, PropTypes } from 'react';
import EditJob from './EditJob.jsx';

import { Jobs } from '../api/jobs.js';

// Job component - represents a single job
export default class Job extends Component {
  deleteThisJob() {
    Jobs.remove(this.props.job._id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.job.company}</td>
        <td>{this.props.job.position}</td>
        <td>{this.props.job.location}</td>
        <td>{this.props.job.state}</td>
        <td><EditJob job={this.props.job}/></td>
        <td>
          <button className="delete" onClick={this.deleteThisJob.bind(this) }>
            &times;
          </button>
        </td>
      </tr>
    );
  }
}

Job.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  job: PropTypes.object.isRequired,
};