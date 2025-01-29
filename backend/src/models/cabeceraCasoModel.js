const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CabeceraCaso = sequelize.define('CabeceraCaso', {
    idcabeceracaso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigocaso: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    fechainiciocabeceracaso: {
      type: DataTypes.DATE,
      allowNull: false
    },
    nombrecliente: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    estadocabeceracaso: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    idtipocaso: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'cabeceracasos',
    timestamps: false
  });

  CabeceraCaso.associate = (models) => {
    CabeceraCaso.belongsTo(models.tipocaso, {
      foreignKey: 'idtipocaso',
      as: 'tipocaso'
    });
  };

module.exports = CabeceraCaso;