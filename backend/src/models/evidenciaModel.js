const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Evidencia = sequelize.define('Evidencia', {
    idevidencia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombreevidencia: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    estadoevidencia: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fechaingresoevidencia: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'evidencias',
    timestamps: false
  });

module.exports = Evidencia;