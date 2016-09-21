/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { UserQuestions } from './userQuestions.js';

if (Meteor.isServer) {
    describe('UserQuestions', () => {
        describe('methods', () => {
            const userId = Random.id();
            let userQuestionId;

            beforeEach(() => {
                UserQuestions.remove({});
                userQuestionId = UserQuestions.insert({
                    questionId: 'testQuestionId',
                    answer: 'testAnswer',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'testUsername',
                });
            });

            it('can update userQuestion', () => {
                const updateUserQuestion = Meteor.server.method_handlers['userQuestions.update'];

                const invocation = { userId };

                updateUserQuestion.apply(invocation, [userQuestionId, 'testAnswerUpdated']);

                assert.equal(UserQuestions.find().count(), 1);
                assert.equal(UserQuestions.findOne(userQuestionId).answer, 'testAnswerUpdated');
            });
        });
    })
};