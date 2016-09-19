import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Jobs = new Mongo.Collection('jobs');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('jobs', function jobsPublication() {
        return Jobs.find({
            $or: [
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'jobs.insert'(company, position, location, state, tech_stack) {
        check(company, String);
        check(position, String);
        check(location, String);
        check(state, String);
        check(tech_stack, [String]);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Jobs.insert({
            company,
            position,
            location,
            state,
            tech_stack,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'jobs.remove'(jobId) {
        check(jobId, String);

        const job = Jobs.findOne(jobId);
        if (!this.userId || job.owner != this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Jobs.remove(jobId);
    },
    'jobs.update'(jobId, company, position, location, state, tech_stack) {
        check(jobId, String);
        check(company, String);
        check(position, String);
        check(location, String);
        check(state, String);
        check(tech_stack, [String]);

        const job = Jobs.findOne(jobId);
        if (!this.userId || job.owner != this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Jobs.update(jobId, {
            $set: {
                company,
                position,
                location,
                state,
                tech_stack,
            }
        });
    },
});