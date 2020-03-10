import Sequelize from 'sequelize'; // clase Sequelize
import { sequelize } from '../database/database' //conexion a la base

const Equipo = sequelize.define('Equipo', {
    id_equipo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.TEXT,
        unique: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
});


export default Equipo;