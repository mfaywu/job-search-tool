/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Jobs } from './jobs.js';
import { Tasks } from './tasks.js';

if (Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            let userId;
            const username = Random.id();
            let taskId;

            beforeEach(() => {
                Meteor.users.remove({});
                userId = Meteor.users.insert({
                    username: username,
                });
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test text',
                    date: new Date(),
                    createdAt: new Date(),
                    owner: userId,
                    username: username,
                });
                Jobs.remove({});
            });

            it('can insert task no company', () => {
                assert.equal(Jobs.find().count(), 0);
                assert.equal(Tasks.find().count(), 1);
                const insertTask = Meteor.server.method_handlers['tasks.insert'];
                const invocation = { userId };
                const text = Random.id();
                const inputs = [text, new Date(), ''];
                insertTask.apply(invocation, inputs);

                assert.equal(Jobs.find().count(), 0);
                assert.equal(Tasks.find().count(), 2);
                assert.equal(Tasks.findOne({ text: text}).company, '');
            });
            it('can insert task with company', () => {
                assert.equal(Jobs.find().count(), 0);
                assert.equal(Tasks.find().count(), 1);
                const insertTask = Meteor.server.method_handlers['tasks.insert'];
                const invocation = { userId };
                const text = Random.id();
                const inputs = [text, new Date(), 'New company'];
                insertTask.apply(invocation, inputs);

                assert.equal(Jobs.find().count(), 1);
                assert.equal(Jobs.findOne({company: 'New company'}).company, 'New company');
                assert.equal(Tasks.find().count(), 2);
                assert.equal(Tasks.findOne({ text: text}).company, 'New company');
            });
            it('can delete owned task', () => {
                assert.equal(Meteor.users.findOne(userId).username, username);
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];
                const invocation = { userId };
                deleteTask.apply(invocation, [taskId]);

                assert.equal(Tasks.find().count(), 0);
            });
        });
    })
};