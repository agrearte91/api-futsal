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
        'SELECT dni_jugador, sum(cantidad) as goles from "Jugador_convierte_Partido" left outer join "Partido" on "Jugador_convierte_Partido".id_partido =  "Partido".id_partido where "Partido".id_categoria='+id_categoria+' group by "Jugador_convierte_Partido".dni_jugador;'
,{ type: sequelize.QueryTypes.SELECT});
 };





//Jugador_convierte_Partido.belongsTo(Partido, {foreignKey: 'id_partido'} );
//Jugador_convierte_Partido.hasMany(Partido, {foreignKey: 'id_partido', as:'Jugador_convierte_Partido'});

export default Jugador_convierte_Partido;