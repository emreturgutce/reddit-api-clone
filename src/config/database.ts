import { createConnection, Connection } from 'typeorm';

let connection: Connection;

(async () => {
  connection = await createConnection();
})().catch((err) => console.error(err));

export { connection };
