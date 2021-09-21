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


Categoria_contiene_Equipo.obtenerEquipos = async function (id_categoria) { 
    return await sequelize.query(
        'SELECT equip.id_equipo, equip.nombre from "Categoria_contiene_Equipo" as cce inner join "Equipo" as equip on cce.id_equipo = equip.id_equipo where cce.id_categoria='+id_categoria+';' 
        ,{ type: sequelize.QueryTypes.SELECT});
 };

 
export default Categoria_contiene_Equipo;