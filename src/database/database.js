import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'futsal',
    'postgres', //user
    'postgres', //pass
    {
        host: '170.210.81.246',
        port: '30432',
        dialect: 'postgres',
        pool: {
            max: 3,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: true
    }
)