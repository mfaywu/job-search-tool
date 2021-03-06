import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { UserQuestions } from '../../api/userQuestions.js';

// Task component - represents a single task
export default class UserQuestionBehavioural extends Component {
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
        <td>
          <button className="delete" onClick={this.deleteThisUserQuestion.bind(this) }>
            &times;
          </button>
        </td>
      </tr>
    );
  }
}

UserQuestionBehavioural.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  userQuestion: PropTypes.object.isRequired,
};