#! /bin/bash

export PGPASSWORD=ZceIdtdqt4wvjmQQvWdO

cd sql
psql -h 127.0.0.1 -p 5432 -U postgres -f database.sql
cd ..