#!/bin/bash
# Script to apply Prisma migration to Cloud SQL

echo "Connecting to Cloud SQL and applying migration..."
mysql -h 34.55.144.158 -u hms_user -p'ce1te1**2012' hms_db < hms-backend/prisma/migrations/20251201180343_init/migration.sql

echo "Verifying tables created..."
mysql -h 34.55.144.158 -u hms_user -p'ce1te1**2012' hms_db -e "SHOW TABLES;"
