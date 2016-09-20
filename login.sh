#!/usr/bin/expect -f

set user [lindex $argv 0]
set pass [lindex $argv 1]

spawn meteor login
expect "Username: "
send "$user\r"
expect "Password: "
send "$pass\r"
interact
