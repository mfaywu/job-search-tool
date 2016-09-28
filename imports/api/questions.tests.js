/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Questions } from './questions.js';

if (Meteor.isServer) {
    describe('Questions', () => {
        describe('methods', () => {
            const userId = Random.id();
            const username = Random.id();
            let questionId;

            beforeEach(() => {
                Questions.remove({});
                questionId = Questions.insert({
                    question: 'testQuestion',
                    type: 'Behavioural',
                    stars: 0,
                    createdAt: new Date(),
                    creator: username,
                });
                Meteor.users.remove({});
                Meteor.users.insert({
                    _id: userId,
                    username: username,
                });
            });

            it('can insert question', () => {
                const insertQuestion = Meteor.server.method_handlers['questions.insert'];
                const invocation = { userId };
                const inputs = ['newQuestion', 'Behavioural'];
                insertQuestion.apply(invocation, inputs);

                assert.equal(Questions.find().count(), 2);
                assert.equal(Questions.findOne({question: 'newQuestion'}).type, 'Behavioural');
            });
            it('can remove question', () => {
                const removeQuestion = Meteor.server.method_handlers['questions.remove'];
                const invocation = { userId };
                removeQuestion.apply(invocation, [questionId]);

                assert.equal(Questions.find().count(), 0);
            });
            it('can update question', () => {
                const updateQuestion = Meteor.server.method_handlers['questions.update'];
                const invocation = { userId };
                const inputs = [questionId, 'newQuestion', 'To Ask'];
                updateQuestion.apply(invocation, inputs);

                assert.equal(Questions.find().count(), 1);
                assert.equal(Questions.findOne(questionId).question, 'newQuestion');
                assert.equal(Questions.findOne(questionId).type, 'To Ask');
            });
            it('can add star', () => {
                const addStar = Meteor.server.method_handlers['questions.addStar'];
                const invocation = { userId };
                addStar.apply(invocation, [questionId]);

                assert.equal(Questions.find().count(), 1);
                assert.equal(Questions.findOne(questionId).stars, 1);
            });
            it('can remove star', () => {
                const removeStar = Meteor.server.method_handlers['questions.removeStar'];
                const invocation = { userId };
                removeStar.apply(invocation, [questionId]);

                assert.equal(Questions.find().count(), 1);
                assert.equal(Questions.findOne(questionId).stars, 0);
            });
        });
    })
};