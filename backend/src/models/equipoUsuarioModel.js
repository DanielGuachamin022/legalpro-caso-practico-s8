const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EquipoUsuario = sequelize.define('EquipoUsuario', {
    idequipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    idusuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'equipousuario',
    timestamps: false
  });

module.exports = EquipoUsuario;
