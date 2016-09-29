/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Jobs } from './jobs.js';
import { Tasks } from './tasks.js';

if (Meteor.isServer) {
    describe('Jobs', () => {
        describe('methods', () => {
            const userId = Random.id();
            const username = Random.id(4);
            let jobId;
            let taskId;

            beforeEach(() => {
                Jobs.remove({});
                jobId = Jobs.insert({
                    company: 'testCompany',
                    positions: ['testPosition1', 'testPosition2'],
                    locations: ['testLocation1', 'testLocation2'],
                    state: 'testState',
                    tech_stack: [],
                    pros: ['location', 'salary'],
                    cons: ['conTest'],
                    links: ['http://job-search.meteorapp.com'],
                    createdAt: new Date(),
                    owner: userId,
                    username: username,
                });
                Meteor.users.remove({});
                Meteor.users.insert({
                    _id: userId,
                    username: username,
                });
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'testTask',
                    date: new Date(),
                    jobId: jobId,
                    company: 'testCompany',
                    done: false,
                    createdAt: new Date(),
                    owner: this.userId,
                    username: username,
                });
            });

            //Tests for 'jobs.insert'
            it('can add job', () => {
                const addJob = Meteor.server.method_handlers['jobs.insert'];
                const invocation = { userId };
                const inputs = ['addTest',
                    ['addPosition1', 'addPosition2'],
                    ['addLocation'],
                    'addState',
                    [],
                    [],
                    [],
                    [],];
                addJob.apply(invocation, inputs);

                assert.equal(Jobs.find().count(), 2);
            });

            //Tests for 'jobs.remove'
            it('can delete owned job', () => {
                const deleteJob = Meteor.server.method_handlers['jobs.remove'];
                const invocation = { userId };
                deleteJob.apply(invocation, [jobId]);

                assert.equal(Jobs.find().count(), 0);
            });

            //Tests for 'jobs.update'
            it('can update owned job', () => {
                assert.equal(Jobs.findOne(jobId).company, 'testCompany');
                assert.equal(Jobs.findOne(jobId).positions[0], 'testPosition1');
                assert.equal(Jobs.findOne(jobId).locations[0], 'testLocation1');
                assert.equal(Jobs.findOne(jobId).state, 'testState');
                const updateJob = Meteor.server.method_handlers['jobs.update'];
                const invocation = { userId };
                const inputs = [jobId,
                    'newCompany',
                    ['newPosition'],
                    ['newLocation'],
                    'newState',
                    ['JS'],
                    [],
                    [],
                    [],
                ];
                updateJob.apply(invocation, inputs);

                assert.equal(Jobs.find().count(), 1);
                assert.equal(Jobs.findOne(jobId).company, 'newCompany');
                assert.equal(Jobs.findOne(jobId).positions[0], 'newPosition');
                assert.equal(Jobs.findOne(jobId).locations[0], 'newLocation');
                assert.equal(Jobs.findOne(jobId).state, 'newState');
                assert.equal(Jobs.findOne(jobId).tech_stack[0], 'JS');
            });

            //Tests for 'jobs.addTask'
            it('can add task to owned job with no tasks', () => {
                assert.equal(Jobs.findOne(jobId).tasks, undefined);
                const addTask = Meteor.server.method_handlers['jobs.addTask'];
                const invocation = { userId };
                const inputs = [jobId, taskId];
                addTask.apply(invocation, inputs);

                assert.equal(Jobs.find().count(), 1);
                assert.equal(Jobs.findOne(jobId).tasks[0], taskId);
            }); 
            it('can add task to owned job with tasks', () => {
                const addTask = Meteor.server.method_handlers['jobs.addTask'];
                const invocation = { userId };

                //Add the first task to empty task list
                const inputs = [jobId, taskId];
                addTask.apply(invocation, inputs);

                assert.equal(Jobs.find().count(), 1);

                let taskId2 = Tasks.insert({
                    text: 'testTask2',
                    date: new Date(),
                    jobId: jobId,
                    company: 'testCompany',
                    done: false,
                    createdAt: new Date(),
                    owner: this.userId,
                    username: username,
                });
                //Add the second task to non-empty task list
                const inputs2 = [jobId, taskId2];
                addTask.apply(invocation, inputs2);

                assert.equal(Jobs.findOne(jobId).tasks[0], taskId);
                assert.equal(Jobs.findOne(jobId).tasks[1], taskId2);
            });

            //Tests for 'jobs.removeTask'
            it('can remove independent task', () => {
                const removeTask = Meteor.server.method_handlers['jobs.removeTask'];
                const invocation = { userId };

                const inputs = [jobId, taskId];
                removeTask.apply(invocation, inputs);

                assert.equal(Jobs.findOne(jobId).tasks.length, 0);
                //It should not remove task from Tasks
                assert.equal(Tasks.findOne(taskId)._id, taskId);
            });
        });
    })
};