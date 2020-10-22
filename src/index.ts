import 'reflect-metadata';
import 'colors';
import dotenv from 'dotenv';

dotenv.config();

import { connection } from './config/database';

console.clear();

connection
  .create()
  .then(() => console.log(`🐘 Connected to PostgreSQL Database`.blue.bold))
  .catch((err) => {
    console.error(
      `❌ Error Occurred Connecting PostgreSQL Database :\n${err}`.red.bold,
    );
  });

import './config/redis';

import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 App is running on port ${PORT}`.green);
});
