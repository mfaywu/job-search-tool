import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Button, Table } from 'react-bootstrap';

export default class HomeTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <br/>
        <br/>
        
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Task</th>
              <th>Do by</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           
          </tbody>
        </Table>

       
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
           
          </tbody>
        </Table>
      </div>
    );
  };
}

HomeTab.propTypes = {
  questions: PropTypes.array.isRequired,
  userQuestions: PropTypes.array.isRequired,
};