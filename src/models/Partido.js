import Sequelize from 'sequelize';
import {sequelize } from '../database/database';
import Categoria from './Categoria';
import Equipo from './Equipo';
import Persona from './Persona';
import Jugador_convierte_Gol from './Jugador_convierte_Partido';

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
    },
    fecha:{
        type: Sequelize.DATE
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

Partido.consulta = async function (id_categoria) { 
    return await sequelize.query(
        'SELECT * from "Partido" where "Partido".id_categoria='+id_categoria+' and "Partido".jugado=true;'
,{ type: sequelize.QueryTypes.SELECT});
 };

 Partido.obtenerPartidosDeCategoria = async function (id_categoria) { 
    return await sequelize.query(
        ' SELECT part.nro_fecha, id_partido, part.id_equipo_local, equipo_local.nombre as nombre_local, part.id_equipo_visitante, equipo_visitante.nombre as nombre_visitante, part.jugado, goles_local, goles_visitante, part.fecha, part.hora FROM public."Partido" as part right outer join "Equipo" as equipo_local on (part.id_equipo_local = equipo_local.id_equipo) right outer join "Equipo" as equipo_visitante on (part.id_equipo_visitante = equipo_visitante.id_equipo) where part.id_categoria='+id_categoria+ 
        ' order by nro_fecha;',{ type: sequelize.QueryTypes.SELECT});
 };

export default Partido;