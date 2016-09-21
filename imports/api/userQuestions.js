import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Questions } from './questions.js';

export const UserQuestions = new Mongo.Collection('userQuestions');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('userQuestions', function userQuestionsPublication() {
        return UserQuestions.find({
            $or: [
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'userQuestions.insert'(questionId, answer) {
        check(questionId, String);
        check(answer, String);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        const questionItem = Questions.findOne(questionId);
        if (!questionItem) {
            throw new Meteor.Error('cannot find question');
        }

        UserQuestions.insert({
            question: {questionId: questionId, 
                question: questionItem.question, 
                type: questionItem.type},
            answer,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });

        //Also increases the star for the question
        Meteor.call('questions.addStar', questionId);
    },
    'userQuestions.remove'(userQuestionId) {
        check(userQuestionId, String);

        const userQuestion = UserQuestions.findOne(userQuestionId);
        if (!this.userId || userQuestion.owner != this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        if (!userQuestion) {
            throw new Meteor.Error('not found userQuestion');
        }
        //Also decrease question's stars
        Meteor.call('questions.removeStar', userQuestion.question["questionId"]);

        UserQuestions.remove(userQuestionId);
    },
    'userQuestions.update'(userQuestionId, answer) {
        //Can only update answer
        check(userQuestionId, String);
        check(answer, String);

        const userQuestion = UserQuestions.findOne(userQuestionId);
        if (!this.userId || userQuestion.owner != this.userId) { 
            throw new Meteor.Error('not-authorized');
        }
        if (!userQuestion) {
            throw new Meteor.Error('not found userQuestion');
        }

        UserQuestions.update(userQuestionId, {
            $set: {
                answer,
            }
        });
    },
});