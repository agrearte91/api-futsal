import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    //'Futsal',
    'postgres',
    'postgres', //user
    //'postgres', //pass
    's3a22op827',

    {
        //host: '170.210.81.246',
        host: 'localhost',
        //port: '30432',
        port: '5432',
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