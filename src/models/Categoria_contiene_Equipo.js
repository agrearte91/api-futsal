import Sequelize from 'sequelize'; // clase Sequelize
import { sequelize } from '../database/database' //conexion a la base

const Categoria_contiene_Equipo = sequelize.define('Categoria_contiene_Equipo', {
        id_equipo: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }, 
        id_categoria: {
            type: Sequelize.INTEGER,
            primaryKey:true
        }
    }, {
        timestamps: false,
        freezeTableName: true 
    }
);

export default Categoria_contiene_Equipo;