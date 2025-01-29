const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Perfil = sequelize.define('Perfil', {
    idperfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreperfil: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    estadoperfil: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'perfiles',
    timestamps: false,
});

module.exports = Perfil;
