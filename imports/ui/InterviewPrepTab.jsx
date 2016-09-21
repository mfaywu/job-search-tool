import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Button, Table } from 'react-bootstrap';

import { Questions } from '../api/questions.js';
import { UserQuestions } from '../api/userQuestions.js';

import Question from './Questions/Question.jsx';
import AddQuestion from './Questions/AddQuestion.jsx';
import SeeCommunityQuestions from './Questions/SeeCommunityQuestions.jsx';
import UserQuestionBehavioural from './UserQuestions/UserQuestionBehavioural.jsx';
import UserQuestionToAsk from './UserQuestions/UserQuestionToAsk.jsx';
import EditUserQuestion from './UserQuestions/EditUserQuestion.jsx';

export default class HomeTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  renderUserQuestionsToAsk() {
    return this.props.userQuestions.map((userQuestion) => (
      (userQuestion.question && userQuestion.question["type"] == "To Ask") ? 
        <UserQuestionToAsk key={userQuestion._id} userQuestion={userQuestion} />
      : <tr></tr>
    ));
  }
  renderUserQuestionsBehavioural() {
    return this.props.userQuestions.map((userQuestion) => (
      (userQuestion.question && userQuestion.question["type"] == "Behavioural") ?
      <UserQuestionBehavioural key={userQuestion._id} userQuestion={userQuestion} />
      : <tr></tr>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderUserQuestionsToAsk() }
          </tbody>
        </Table>


        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>QuestionId</th>
              <th>Answer</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.renderUserQuestionsBehavioural() }
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