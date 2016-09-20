import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../../api/tasks.js';

// Task component - represents a single task
export default class Task extends Component {
  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  nothing() {
    //do nothing
  }

  render() {
    return (
      <tr>
        <td>{this.props.task.text}</td>
        <td>{this.props.task.date.toString()}</td>    
        <td>
          <button className="delete" onClick={this.deleteThisTask.bind(this) }>
            &times;
          </button>
        </td>
      </tr>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};