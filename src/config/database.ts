import { createConnection, getConnection } from 'typeorm';

const connection = {
  async create() {
    return createConnection();
  },

  get() {
    return getConnection();
  },

  async close() {
    try {
      await getConnection().close();
    } catch (error) {}
  },

  async clear() {
    const conn = getConnection();
    const entities = conn.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = conn.getRepository(entity.name);
      await repository.query(`DELETE FROM "${entity.tableName}";`);
    });
  },
};

export { connection };
