import Sequelize from 'sequelize'; // clase Sequelize
import { sequelize } from '../database/database' //conexion a la base

const Jugador_integra_Lista = sequelize.define('Jugador_integra_Lista', {
        dni_jugador: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }, 
        id_lista: {
            type: Sequelize.INTEGER,
            primaryKey:true
        }
    }, {
        timestamps: false,
        freezeTableName: true 
    }
);

export default Jugador_integra_Lista;