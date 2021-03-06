import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { UserQuestions } from '../../api/userQuestions.js';
import EditUserQuestion from './EditUserQuestion.jsx';

// Task component - represents a single task
export default class UserQuestion extends Component {
  deleteThisUserQuestion() {
    Meteor.call('userQuestions.remove', this.props.userQuestion._id);
  }

  nothing() {
    //do nothing
  }

  render() {
    return (
      <tr>
        <td>{ this.props.userQuestion.question ? this.props.userQuestion.question["question"] : "" }</td>
        <td>{this.props.userQuestion.answer}</td>
        <td>
          <EditUserQuestion userQuestion={this.props.userQuestion}/>
        </td>
        <td>
          <button className="delete" onClick={this.deleteThisUserQuestion.bind(this) }>
            &times;
          </button>
        </td>
      </tr>
    );
  }
}

UserQuestion.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  userQuestion: PropTypes.object.isRequired,
};