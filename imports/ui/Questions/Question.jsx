import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';

import { Questions } from '../../api/questions.js';

// Task component - represents a single task
export default class Question extends Component {
  addThisQuestion() {
    Meteor.call('userQuestions.insert', this.props.question._id, "");
  }

  nothing() {
    //do nothing
  }

  render() {
    return (
      <tr>
        <td>{this.props.question.question}</td>
        <td>{this.props.question.creator}</td>
        <td>{this.props.question.stars.toString()}</td>    
        <td>{this.props.question.type}</td>
        <td>
          <Button bsStyle="info" onClick={this.addThisQuestion.bind(this) }>
            Add
          </Button>
        </td>
      </tr>
    );
  }
}

Question.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  question: PropTypes.object.isRequired,
};