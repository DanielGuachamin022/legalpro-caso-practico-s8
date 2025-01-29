const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Plazo = sequelize.define('Plazo', {
    idplazo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombreplazo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fechaingresoplazo: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechainicioplazo: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechafinplazo: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estadoplazo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'plazos',
    timestamps: false
  });

module.exports = Plazo;