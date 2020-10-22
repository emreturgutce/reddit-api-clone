import 'reflect-metadata';
import 'colors';
import { PORT } from './config';
import { connection } from './config/database';
import { app } from './app';

console.clear();

connection
  .create()
  .then(() => console.log(`🐘 Connected to PostgreSQL Database`.blue.bold))
  .catch((err) => {
    console.error(
      `❌ Error Occurred Connecting PostgreSQL Database :\n${err}`.red.bold,
    );
  });

app.listen(PORT, () => {
  console.log(`🚀 App is running on port ${PORT}`.green);
});
