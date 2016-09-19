import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Jobs } from './jobs.js';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({
            $or: [
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'tasks.insert'(text, date, company) {
        date = new Date(date);
        check(text, String);
        check(date, Date);
        check(company, String);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let job = Jobs.findOne({ company: company });
        if (!job) {
            Meteor.call('jobs.insert', company, '', '', 'Not Started', []);
            job = Jobs.findOne({ company: company });
        }
        const jobId = job._id;

        const taskId = Tasks.insert({
            text,
            date,
            jobId,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
        Meteor.call('jobs.addTask', job._id, taskId);
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        const task = Tasks.findOne(taskId);
        if (!this.userId || task.owner != this.userId) {
            throw new Meteor.Error('not-authorized to remove this task');
        }

        if (Jobs.findOne(task.jobId)) {
            Meteor.call('jobs.removeTask', task.jobId, taskId);
        }

        Tasks.remove(taskId);
    },
    'tasks.updateNoCompany'(taskId, text, date) {
        check(taskId, String);
        date = new Date(date);
        check(text, String);
        check(data, Date);

        const task = Tasks.findOne(taskId);
        if (!this.userId || task.owner != this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, {
            $set: {
                text,
                date,
            }
        });
    },
    'tasks.updateCompany'(taskId, company) {
        check(taskId, String);
        check(company, String);

        const task = Tasks.findOne(taskId);
        if (!this.userId || task.owner != this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        const oldId = task.jobId;

        let job = Jobs.findOne({ company: company });
        if (!job) {
            Meteor.call('jobs.add', company, '', '', 'Not Started', []);
            job = Jobs.findOne({ company: company });
        }
        const newId = job._id;

        if (!oldId || newId != oldId) {
            //add to new
            Meteor.call('jobs.addTask', newId, taskId);
            Tasks.update(taskId, {
                $set: {
                    jobId: newId,
                }
            })
        }
        if (oldId && newId != oldId) {
            //delete old
            Meteor.call('jobs.removeTask', oldId, taskId);
        }
    },
});