import Sequelize from 'sequelize';
import {sequelize } from '../database/database';

import Tabla from './Tabla';
import ListaInscripcion from './ListaInscripcion';

const Categoria = sequelize.define('Categoria', {
    id_categoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.TEXT
    },
    tipo: {
        type: Sequelize.TEXT
    },
    anio_torneo: {
        type: Sequelize.INTEGER
    },
    tipo_torneo: {
        type: Sequelize.TEXT
    },
    id_tabla:{
        type: Sequelize.INTEGER,
        unique:true
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

Categoria.belongsTo(Tabla,{foreignKey: 'id_tabla', as:'tabla'}); // funciona bien! COn torneo no puedo hacer lo mismo (por ahora), porque tiene dos claves primarias.


//Categoria.hasMany(ListaInscripcion, {foreignKey: 'id_categoria', as:'listas'});    //está bien (en 'as' poner nombres simples y en minuscula)
//Lo que hace es llevar id_categoria a ListaInscripción . 





// When you have a 1:N relation between models you only need to refer the id from the "1" model, on our case the User model, on the "N" model, Photos. So doing:
//https://stackoverflow.com/questions/44070808/hasmany-called-with-something-thats-not-an-instance-of-sequelize-model

export default Categoria;