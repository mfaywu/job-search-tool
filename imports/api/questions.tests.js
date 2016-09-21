/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Questions } from './questions.js';

if (Meteor.isServer) {
    describe('Questions', () => {
        describe('methods', () => {
            const userId = Random.id();
            let questionId;

            beforeEach(() => {
                Questions.remove({});
                questionId = Questions.insert({
                    question: 'testQuestion',
                    type: 'behavioural',
                    stars: 0,
                    createdAt: new Date(),
                    creator: 'testCreator',
                });
            });

            it('can add star', () => {
                // Find the internal implementation of the job method so we can
                // test it in isolation
                const addStar = Meteor.server.method_handlers['questions.addStar'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };

                // Run the method with `this` set to the fake invocation
                addStar.apply(invocation, [questionId]);

                // Verify that the method does what we expected
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