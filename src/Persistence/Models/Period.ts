const { DataTypes } = require('sequelize');
import sequelizeConnection from '../Conecction'
import Subscription from './Subscription';
// import Subscription from './Subscription';

const Period = sequelizeConnection.define('Period', {
  // Model attributes are defined here
  X_PERIODO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  F_INI: {
    type: DataTypes.DATE,
    allowNull: false
  },
  F_FIN: {
    type: DataTypes.DATE,
    allowNull: false
  },
  N_IMPORTE_PETICION: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  SUS_X_SUSCRIPCION: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subscription,
      key: 'X_SUSCRIPCION',
    }
  },
}, {
  tableName: 'FACT_PERIODO',
  timestamps: false,
  // Other model options go here
});


Period.belongsTo(Subscription, {foreignKey: 'SUS_X_SUSCRIPCION',targetKey: 'X_SUSCRIPCION'});

console.log(Period === sequelizeConnection.models.Period); // true

export default Period;

