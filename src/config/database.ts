import { createConnection, getConnection } from 'typeorm';

const connection = {
  async create() {
    return await createConnection();
  },

  get() {
    return getConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};

export { connection };
