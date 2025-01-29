const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DetalleCaso = sequelize.define('DetalleCaso', {
    iddetallecaso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    observacionesdetallecaso: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    estadodetallecaso: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    idevidencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idplazo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idcabeceracaso: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'detallecasos',
    timestamps: false
  });

  DetalleCaso.associate = (models) => {
    DetalleCaso.belongsTo(models.evidencia, {
      foreignKey: 'idevidencia',
      as: 'evidencia'
    });
    DetalleCaso.belongsTo(models.plazo, {
      foreignKey: 'idplazo',
      as: 'plazo'
    });
    DetalleCaso.belongsTo(models.cabeceracaso, {
      foreignKey: 'idcabeceracaso',
      as: 'cabeceracaso'
    });
  };

module.exports = DetalleCaso;