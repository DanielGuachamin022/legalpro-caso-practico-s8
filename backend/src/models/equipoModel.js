const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Equipo = sequelize.define('Equipo', {
    idequipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombreequipo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    estadoequipo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'equipos',
    timestamps: false
  });

module.exports = Equipo;