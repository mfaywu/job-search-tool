import React, { Component, PropTypes } from 'react';
import EditJob from './EditJob.jsx';
 
// Job component - represents a single job
export default class Job extends Component {
  render() {
    return (
        <tr>
            <td>{this.props.job.company}</td>
            <td>{this.props.job.position}</td>
            <td>{this.props.job.location}</td>
            <td>{this.props.job.state}</td>
            <td><EditJob job={this.props.job}/></td>
      </tr>
    );
  }
}
 
Job.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  job: PropTypes.object.isRequired,
};