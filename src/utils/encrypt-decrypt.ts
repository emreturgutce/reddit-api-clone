import CryptoJS from 'crypto-js';

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, process.env.ENCRYPTION_KEY!).toString();
};

export const decrypt = (encrypted: string) => {
  return CryptoJS.AES.decrypt(encrypted, process.env.ENCRYPTION_KEY!).toString(
    CryptoJS.enc.Utf8,
  );
};
