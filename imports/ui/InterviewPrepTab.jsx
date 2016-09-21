import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Button, Table } from 'react-bootstrap';

import { Questions } from '../api/questions.js';
import { UserQuestions } from '../api/userQuestions.js';

import Question from './Questions/Question.jsx';
import AddQuestion from './Questions/AddQuestion.jsx';
import SeeCommunityQuestions from './Questions/SeeCommunityQuestions.jsx';
import UserQuestion from './UserQuestions/UserQuestion.jsx';
import EditUserQuestion from './UserQuestions/EditUserQuestion.jsx';

export default class HomeTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  renderQuestions() {
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} />
    ));
  }
  renderUserQuestions() {
    return this.props.userQuestions.map((userQuestion) => (
      <UserQuestion key={userQuestion._id} userQuestion={userQuestion} />
    ));
  }

  render() {
    return (
      <div>
        <br/>
        <br/>

        <AddQuestion />
        <SeeCommunityQuestions questions={this.props.questions}/>
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


        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>QuestionId</th>
              <th>Answer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.renderUserQuestions() }
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