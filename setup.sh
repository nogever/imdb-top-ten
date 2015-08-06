#!/bin/bash

if [ ! -f imdbtopten.db ]; then
    sqlite3 imdbtopten.db < schema.sql
fi

if [ ! -d venv  ]; then
    virtualenv venv/
fi

. venv/bin/activate
