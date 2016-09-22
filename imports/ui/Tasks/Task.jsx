import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Tasks } from '../../api/tasks.js';

// Task component - represents a single task
export default class Task extends Component {
  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  toggleChecked() {
    Meteor.call('tasks.changeDone', this.props.task._id);
  }

  render() {
    const taskClassName = classnames({
      done: this.props.task.done,
    });
    return (
      <tr className={taskClassName}>
        <td>
          <input
            type="checkbox"
            readOnly
            checked={this.props.task.done}
            onClick={this.toggleChecked.bind(this) }
            />
        </td>
        <td className="text">{this.props.task.text}</td>
        <td>{this.props.task.date.toISOString().substring(0, 10) }</td>
        <td>{this.props.task.company}</td>
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