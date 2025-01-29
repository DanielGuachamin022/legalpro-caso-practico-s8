const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuarios = require('./usuarioModel'); // Asegúrate de que exista este modelo
const CabeceraCasos = require('./cabeceraCasoModel'); // Asegúrate de que exista este modelo

const CasoUsuario = sequelize.define(
  'CasoUsuario',
  {
    idcabeceracaso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: CabeceraCasos,
        key: 'IdCabeceraCaso',
      },
    },
    idusuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Usuarios,
        key: 'IdUsuario',
      },
    },
  },
  {
    tableName: 'casousuario',
    timestamps: false,
  }
);

// Relaciones
CasoUsuario.belongsTo(Usuarios, { foreignKey: 'idusuario' });
Usuarios.hasMany(CasoUsuario, { foreignKey: 'idusuario' });

CasoUsuario.belongsTo(CabeceraCasos, { foreignKey: 'idcabeceracaso' });
CabeceraCasos.hasMany(CasoUsuario, { foreignKey: 'idcabeceracaso' });

module.exports = CasoUsuario;
