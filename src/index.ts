import 'reflect-metadata';
import 'colors';
import dotenv from 'dotenv';
import { exec } from 'child_process';

dotenv.config();

import { connection } from './config/database';

console.clear();

connection
  .create()
  .then(() => console.log(`🐘 Connected to PostgreSQL Database`.blue.bold))
  .catch((err) => console.error(err));

import './config/redis';

import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 App is running on port ${PORT}`.green);
});

function deletePostgresqlContainer() {
  console.log(`🐘 Deleting PostgreSQL Container`.blue.bold);
  exec('docker rm -f reddit-postgres-db', (err, stdout, stderr) => {
    if (err) {
      return console.log(`❌ Could not deleted PostgreSQL Container`.red.bold);
    }

    return console.log(`✔ PostgreSQL Container Deleted`.green.bold);
  });
}

process.on('SIGINT', () => deletePostgresqlContainer());

process.on('SIGTERM', () => deletePostgresqlContainer());
