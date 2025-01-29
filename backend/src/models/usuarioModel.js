const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Perfil = require('./perfilModel');

const Usuario = sequelize.define('Usuario', {
    idusuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ciusuario: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    nombreusuario: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    correousuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    telefonousuario: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    contraseniausuario: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    estadousuario: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    idperfil: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Perfil,
            key: 'idperfil',
        },
    },
}, {
    tableName: 'usuarios',
    timestamps: false,
});

Perfil.hasMany(Usuario, { foreignKey: 'idperfil' });
Usuario.belongsTo(Perfil, { foreignKey: 'idperfil' });

Usuario.findByEmailWithProfile = async (email) => {
    return await Usuario.findOne({
      where: { correousuario: email, estadousuario: true },
      include: {
        model: Perfil,
        where: { estadoperfil: true },
      },
    });
  };

module.exports = Usuario;
