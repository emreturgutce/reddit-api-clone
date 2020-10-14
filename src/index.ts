import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import 'colors';
import './config/database';

console.clear();

import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 App is running on port ${PORT}`.green);
});
