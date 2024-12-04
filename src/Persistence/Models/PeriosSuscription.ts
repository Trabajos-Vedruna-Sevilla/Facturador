const { DataTypes } = require('sequelize');
import sequelizeConnection from '../Conecction';
import Period from './Period';
import Subscription from './Subscription';

const SubscriptionPeriod = sequelizeConnection.define('SubscriptionPeriod', {
  // Atributos del modelo
  X_SUSCRIPCION_PERIODO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  F_INICIO: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  F_FIN: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  // Claves foráneas
  SUS_X_SUSCRIPCION: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Subscription',
      key: 'X_SUSCRIPCION',
    },
  },
  PER_X_PERIODO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Period',
      key: 'X_PERIODO',
    },
  },
}, {
  tableName: 'FACT_SUSCRIPCION_PERIODO',
  timestamps: false,
});

// Asociaciones
SubscriptionPeriod.belongsTo(Subscription, {
  foreignKey: 'SUS_X_SUSCRIPCION',
});

SubscriptionPeriod.belongsTo(Period, {
  foreignKey: 'PER_X_PERIODO',
});

export default SubscriptionPeriod;
