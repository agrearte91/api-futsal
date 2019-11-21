import Sequelize from 'sequelize'; // clase Sequelize
import { sequelize } from '../database/database' //conexion a la base
import Persona from './Persona'

export const Jugador = sequelize.define('Jugador', {
        dni: {
            type: Sequelize.TEXT,
            primaryKey: true

        }, 
        legajo: {
            type: Sequelize.TEXT
        },
        facultad: {
            type: Sequelize.TEXT
        }
    }, {
        timestamps: false,
        freezeTableName: true
    }

);

Jugador.belongsTo(Persona, { foreingKey: 'dni', sourceKey: 'dni' })


export default Jugador;