import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Questions } from '../../api/questions.js';

// Task component - represents a single task
export default class Question extends Component {
  deleteThisQuestion() {
    Meteor.call('questions.remove', this.props.question._id);
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
          <button className="delete" onClick={this.deleteThisQuestion.bind(this) }>
            &times;
          </button>
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