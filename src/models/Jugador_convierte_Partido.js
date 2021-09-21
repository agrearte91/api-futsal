import Sequelize from 'sequelize'; // clase Sequelize
import { sequelize } from '../database/database' //conexion a la base
import Partido from './Partido';

const Jugador_convierte_Partido = sequelize.define('Jugador_convierte_Partido', {
        dni_jugador: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }, 
        id_partido: {
            type: Sequelize.INTEGER,
            primaryKey:true
        },
        cantidad: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false,
        freezeTableName: true 
    }
);

Jugador_convierte_Partido.obtenerTablaGoleadores = async function (id_categoria) { 
    return await sequelize.query(
        'SELECT jcp.dni_jugador, persona.nombre, persona.apellido, sum(cantidad) as goles, equipo.nombre as nombre_equipo from "Jugador_convierte_Partido" as jcp inner join "Partido" as partido on jcp.id_partido =  partido.id_partido inner join "Persona" as persona on jcp.dni_jugador = persona.dni inner join "Jugador_integra_Lista" as jil on jil.dni_jugador = jcp.dni_jugador right join "ListaInscripcion" as li on li.id_lista = jil.id_lista and (li.id_equipo = partido.id_equipo_local or li.id_equipo = partido.id_equipo_visitante) right join "Equipo" as equipo on li.id_equipo = equipo.id_equipo where partido.id_categoria='+id_categoria+' group by jcp.dni_jugador, persona.nombre, persona.apellido, equipo.nombre order by goles DESC, persona.nombre ASC limit 13;'
,{ type: sequelize.QueryTypes.SELECT});
 };


//Jugador_convierte_Partido.belongsTo(Partido, {foreignKey: 'id_partido'} );
//Jugador_convierte_Partido.hasMany(Partido, {foreignKey: 'id_partido', as:'Jugador_convierte_Partido'});

export default Jugador_convierte_Partido;