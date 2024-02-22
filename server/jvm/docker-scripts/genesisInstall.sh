#!/bin/bash
source /home/genesis-gks/.bashrc
systemctl start postgresql-14
su -c "source /home/genesis-gks/.bashrc ; genesisInstall" - "genesis-gks"
echo "genesisInstall done"