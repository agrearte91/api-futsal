import Sequelize from 'sequelize';
import {sequelize } from '../database/database';
import Categoria from './Categoria';
import Equipo from './Equipo';
import Persona from './Persona';

const Partido = sequelize.define('Partido', {
    id_partido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nro_fecha: {
        type: Sequelize.TEXT
    },
    goles_local: {
        type: Sequelize.INTEGER
    },
    goles_visitante: {
        type: Sequelize.INTEGER
    },
    jugado: {
        type: Sequelize.BOOLEAN
    },
    id_categoria: {
        type: Sequelize.INTEGER
    },
    id_equipo_local: {
        type: Sequelize.INTEGER
    },
    id_equipo_visitante: {
        type: Sequelize.INTEGER
    },
    dni_arbitro: {
        type: Sequelize.INTEGER
    },
    dni_asistente: {
        type: Sequelize.INTEGER
    },
    hora: {
        type: Sequelize.TIME
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

Partido.belongsTo(Categoria,{foreignKey: 'id_categoria',as:'categoria'});
Partido.belongsTo(Equipo,{foreignKey: 'id_equipo_local',as:'equipoLocal'});
Partido.belongsTo(Equipo,{foreignKey: 'id_equipo_visitante',as:'equipoVisitante'});
Partido.belongsTo(Persona,{foreignKey: 'dni_arbitro',as:'arbitro'});
Partido.belongsTo(Persona,{foreignKey: 'dni_asistente',as:'asistente'});

export default Partido;