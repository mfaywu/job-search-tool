import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Jumbotron, Button } from 'react-bootstrap';

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Jumbotron>
      <h1>Welcome!</h1>
      <p>This tool is meant to help you as you look for a job! It'll help you keep track
        of companies you're applying to as well as tasks you want to do. It's free and 
        hopefully easier than whatever you're using now, be it spreadsheets or trello :-)
      </p>
      <p><a href="https://travis-ci.org/mfaywu/job-search-tool"><img src="https://travis-ci.org/mfaywu/job-search-tool.svg?branch=master"/></a></p>
      <p><a href="https://github.com/mfaywu/job-search-tool"><Button bsStyle="primary">I'm on GitHub!</Button></a></p>
      </Jumbotron>
    );
  };
}