const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TipoCaso = sequelize.define('Tipocaso', {
    idtipocaso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombretipocaso: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    estadotipocaso: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'tipocasos',
    timestamps: false
  });

module.exports = TipoCaso;