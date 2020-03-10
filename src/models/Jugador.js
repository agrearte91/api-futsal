import Sequelize from 'sequelize'; // clase Sequelize
import { sequelize } from '../database/database' //conexion a la base
import Persona from './Persona'

const Jugador = sequelize.define('Jugador', {
        dni: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }, 
        legajo: {
            type: Sequelize.TEXT
        },
        facultad: {
            type: Sequelize.TEXT
        }
    }, {
        timestamps: false,
        freezeTableName: true 
    }

);

//Jugador.belongsTo(Persona, {foreingKey: 'dni', sourceKey: 'dni' });  //no agregué como clave foránea porque agrega un atributo Persondni (eso lo tiene la base)
//Jugador.belongsTo(Persona, { foreingKey: 'dni', targetKey:'dni'});

Jugador.belongsTo(Persona,{foreignKey: 'dni', as:'persona'});

/*Jugador.buscarJugador = async function (dni){
    return await this.findOne({
        where: {dni},
      });
    }; */

export default Jugador;