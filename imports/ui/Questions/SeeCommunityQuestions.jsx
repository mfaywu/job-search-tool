import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Table, Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'

import { Questions } from '../../api/questions.js';

import Question from './Question.jsx';

// Task component - represents a single task
export default class SeeCommunityQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false,
    };
  }

  close() {
    this.setState({ display: false });
  }

  open() {
    this.setState({ display: true });
  }
  nothing() {
    //do nothing
  }

  renderQuestions() {
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} />
    ));
  }

  render() {
    return (
      <div>
        <Modal show={this.state.display} onHide={this.close.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Add questions from your community!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Creator</th>
                  <th>Stars</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { this.renderQuestions() }
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this) }>Close</Button>
          </Modal.Footer>
        </Modal>
        <Button
          bsStyle="primary"
          onClick={ this.open.bind(this) }>
          See Questions from Your Community
        </Button>
      </div>
    );
  }
}

SeeCommunityQuestions.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  questions: PropTypes.array.isRequired,
};