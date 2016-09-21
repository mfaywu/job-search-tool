import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Questions = new Mongo.Collection('questions');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('questions', function questionsPublication() {
        return Questions.find({});
    });
}

Meteor.methods({
    'questions.insert'(question, type) {
        check(question, String);
        check(type, String);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        const stars = 0;
        Questions.insert({
            question,
            type,
            stars,
            createdAt: new Date(),
            creator: Meteor.users.findOne(this.userId).username,
        });
    },
    'questions.remove'(questionId) {
        //Should not be called right now
        check(questionId, String);

        const question = Questions.findOne(questionId);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        //Issue: May be the case that someone is using this question 
        Questions.remove(questionId);
    },
    'questions.update'(questionId, question, type) {
        check(questionId, String);
        check(question, String);
        check(type, String);

        const questionItem = Questions.findOne(questionId);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Questions.update(questionId, {
            $set: {
                question,
                type,
            }
        });
    },
    'questions.addStar'(questionId) { 
        //Only called by api/users.js
        check(questionId, String);

        const question = Questions.findOne(questionId);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        if (!question) {
            throw new Meteor.Error('no-question');
        }
        const stars = question.stars + 1;

        Questions.update(questionId, {
            $set: {
                stars,
            }
        })
    },
    'questions.removeStar'(questionId) { 
        //Only called by api/users.js
        check(questionId, String);

        const question = Questions.findOne(questionId);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        if (!question) {
            throw new Meteor.Error('no-question');
        }
        const stars = (question.stars >= 1) ? question.stars - 1 : 0;

        Questions.update(questionId, {
            $set: {
                stars,
            }
        })
    }
});