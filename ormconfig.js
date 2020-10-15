module.exports = {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.NODE_ENV === 'development' ?
        'reddit_api_clone' :
        process.env.NODE_ENV === 'test' ?
        'reddit_api_clone_test' :
        undefined,
    synchronize: true,
    logging: process.env.NODE_ENV === 'developement',
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