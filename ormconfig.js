const {
    PG_HOST,
    PG_PORT,
    PG_USER,
    PG_PASSWORD,
    NODE_ENV,
} = require('./src/config/');

module.exports = {
    type: 'postgres',
    host: PG_HOST,
    port: PG_PORT,
    username: PG_USER,
    password: PG_PASSWORD,
    database: NODE_ENV === 'development' ?
        'reddit_api_clone' :
        NODE_ENV === 'test' ?
        'reddit_api_clone_test' :
        undefined,
    synchronize: true,
    logging: NODE_ENV === 'development',
    entities: ['src/models/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    seeds: ['src/seeds/**/*.ts'],
    factories: ['src/factories/**/*.ts'],
    cli: {
        entitiesDir: 'src/models',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
};