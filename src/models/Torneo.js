import Sequelize from 'sequelize'; // clase Sequelize
import { sequelize } from '../database/database' //conexion a la base
import Categoria from './Categoria';
import ListaInscripcion from './ListaInscripcion';

const Torneo = sequelize.define('Torneo', {
    anio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    tipo: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.TEXT,
    },
    abierto: {
        type: Sequelize.BOOLEAN,
    }

}, {
    timestamps: false,
    freezeTableName: true,
});

//Torneo.hasMany(ListaInscripcion,{foreignKey:'id_lista', as:"listas"});  //Chequear si esta bien eso después 

//Torneo.hasMany(ListaInscripcion, {foreignKey: 'id_categoria', as:'listas'});
//Torneo.hasMany(ListaInscripcion, {as:'listas'});

export default Torneo;