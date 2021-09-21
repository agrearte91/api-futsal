import Sequelize from 'sequelize'; // clase Sequelize
import { sequelize } from '../database/database' //conexion a la base

import Jugador from './Jugador';
import Equipo from './Equipo';

const ListaInscripcion = sequelize.define('ListaInscripcion', {
    id_lista: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.TEXT
    },
    descripcion:{
        type: Sequelize.TEXT
    },
    id_equipo:{
        type: Sequelize.INTEGER
    },
    anio_torneo:{
        type: Sequelize.INTEGER
    },
    tipo_torneo:{
        type: Sequelize.INTEGER
    },
    dni_capitan:{
        type: Sequelize.INTEGER
    },
    dni_delegado:{
        type: Sequelize.INTEGER
    },
    dni_subdelegado:{
        type: Sequelize.INTEGER
    }

}, {
    timestamps: false,
    freezeTableName: true,
});

ListaInscripcion.belongsTo(Equipo,{foreignKey: 'id_equipo', as:'equipo'});
ListaInscripcion.belongsTo(Jugador,{foreignKey: 'dni_capitan',as:'capitan'});
ListaInscripcion.belongsTo(Jugador,{foreignKey: 'dni_delegado',as:'delegado'});
ListaInscripcion.belongsTo(Jugador,{foreignKey: 'dni_subdelegado',as:'subDelegado'}); 

export default ListaInscripcion;