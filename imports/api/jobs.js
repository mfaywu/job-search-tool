import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Tasks } from './tasks.js';

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

        //Remove all company's tasks from tasks[String]
        //Call Tasks to remove actual tasks
        if(job.tasks) {
            for (let i = 0; i < job.tasks.length; i++) {
                Tasks.remove(job.tasks[i]);
            }
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
    'jobs.addTask'(jobId, taskId) { 
        //Only called by api/tasks.js
        check(jobId, String);
        check(taskId, String);

        const task = Tasks.findOne(taskId);
        const job = Jobs.findOne(jobId);
        const job_tasks = job.tasks ? job.tasks : [];
        job_tasks.push(taskId);

        if (!this.userId || job.owner != this.userId) {
            throw new Meteor.Error('not-authorized');      
        }
        if (!job) {
            throw new Meteor.Error("no-job", "This job does not exist.");
        }
        if (!task) {
            throw new Meteor.Error("no-task", "This task does not exist.");
        }

        Jobs.update(jobId, {
            $set: {
                tasks: job_tasks,
            }
        })
    },
    'jobs.removeTask'(jobId, taskId) { 
        //Only called by api/tasks.js
        //Deletes the taskId from tasks: [string]
        //Does not remove actual task from Tasks

        check(jobId, String);
        check(taskId, String);

        const job = Jobs.findOne(jobId);
        const job_tasks = job.tasks ? job.tasks : [];
        if (!this.userId || job.owner != this.userId) {
            throw new Meteor.Error('not-authorized jobs remove task');
        }
        if (!job) {
            throw new Meteor.Error("no-job", "This job does not exist.");        
        }

        const idx = job_tasks.indexOf(taskId);
        job_tasks.splice(taskId, 1);

        Jobs.update(jobId, {
            $set: {
                tasks: job_tasks,
            }
        })
    }
});