/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Jobs } from './jobs.js';

if (Meteor.isServer) {
    describe('Jobs', () => {
        describe('methods', () => {
            const userId = Random.id();
            let jobId;

            beforeEach(() => {
                Jobs.remove({});
                jobId = Jobs.insert({
                    company: 'testCompany',
                    position: 'testPosition',
                    location: 'testLocation',
                    state: 'testState',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'testUsername',
                });
            });

            it('can delete owned job', () => {
                // Find the internal implementation of the job method so we can
                // test it in isolation
                const deleteJob = Meteor.server.method_handlers['jobs.remove'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };

                // Run the method with `this` set to the fake invocation
                deleteJob.apply(invocation, [jobId]);

                // Verify that the method does what we expected
                assert.equal(Jobs.find().count(), 0);
            });
        });
    })
};