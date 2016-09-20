#!/usr/bin/expect

spawn meteor login
expect "Username: "
send $METEOR_USERNAME
expect "Password: "
send $METEOR_PASSWORD