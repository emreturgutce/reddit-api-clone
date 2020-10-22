import crypto from 'crypto';

const algorithm = process.env.ENCRYPTION_ALGORITHM!;

const key = crypto
  .createHash('sha256')
  .update(String(process.env.ENCRYPTION_KEY || 'MySuperSecretKey'))
  .digest('base64')
  .substr(0, 32);

export const encrypt = (buffer: Buffer) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);

  return result;
};

export const decrypt = (encrypted: Buffer) => {
  const iv = encrypted.slice(0, 16);

  const e = encrypted.slice(16);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  const result = Buffer.concat([decipher.update(e), decipher.final()]);

  return result;
};
