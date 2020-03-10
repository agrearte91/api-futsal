import Sequelize from 'sequelize'; // clase Sequelize
import { sequelize } from '../database/database' //conexion a la base

const Tabla = sequelize.define('Tabla', {
    id_tabla: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tabla: {
        type: Sequelize.JSON
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export default Tabla;