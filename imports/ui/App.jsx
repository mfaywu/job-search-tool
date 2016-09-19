import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Button } from 'react-bootstrap';

import { Jobs } from '../api/jobs.js';

import Job from './Job.jsx';
import AddJob from './AddJob.jsx';

class App extends Component {   
    constructor(props) {
        super(props);
        
        this.state = {
        };
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
          <AddJob />
        </header> 
 
        <table>
        <tbody>
            <th>Company</th>
            <th>Position</th>
            <th>Location</th>
            <th>State</th>
          {this.renderJobs()}
          </tbody>
        </table>
      </div>
    );
  }
}

App.propTypes = {
    jobs: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        jobs: Jobs.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, App);