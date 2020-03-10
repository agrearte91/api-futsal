import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Persona = sequelize.define('Persona', {
    dni: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.TEXT
    },
    apellido: {
        type: Sequelize.TEXT
    },
    fecha_nacimiento: {
        type: Sequelize.DATE
    },
    telefono: {
        type: Sequelize.TEXT
    },
    correo: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export default Persona;