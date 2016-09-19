import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

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
    'tasks.insert'(text, date) {
        date = new Date(date);
        check(text, String);
        check(date, Date);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text,
            date,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        const task = Tasks.findOne(taskId);
        if (!this.userId || task.owner != this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(taskId);
    },
    'tasks.update'(text, date) {
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
});