#!/bin/bash
systemctl start postgresql-14
systemctl enable sshd.service
systemctl start sshd.service
su -c "startServer" - "genesis-gks"
echo "Logged as genesis-gks, starting server"
tail -f /dev/null