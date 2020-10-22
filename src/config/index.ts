import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
  throw new Error('PORT must be defined as env variable');
}

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV must be defined as env variable');
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined as env variable');
}

if (!process.env.REDIS_HOST) {
  throw new Error('REDIS_HOST must be defined as env variable');
}

if (!process.env.PG_HOST) {
  throw new Error('PG_HOST must be defined as env variable');
}

if (!process.env.PG_PORT) {
  throw new Error('PG_PORT must be defined as env variable');
}

if (!process.env.PG_USER) {
  throw new Error('PG_USER must be defined as env variable');
}

if (!process.env.PG_PASSWORD) {
  throw new Error('PG_PASSWORD must be defined as env variable');
}

if (!process.env.ENCRYPTION_ALGORITHM) {
  throw new Error('ENCRYPTION_ALGORITHM must be defined as env variable');
}

if (!process.env.ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY must be defined as env variable');
}

export const {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  REDIS_HOST,
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  ENCRYPTION_KEY,
  ENCRYPTION_ALGORITHM,
} = process.env;
