const { DataTypes } = require('sequelize');
import sequelizeConnection from '../Conecction'
import PaymentMethod from './PaymentMethod';

const Subscription = sequelizeConnection.define('Subscription', {
  // Model attributes are defined here
  X_SUSCRIPCION: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  D_SUSCRIPCION: {
    type: DataTypes.STRING,
    allowNull: false
  },
  MET_X_METPAGO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PaymentMethod,
      key: 'X_METODOPAGO',
    }
  },
  N_PORCENTAJE_DESCUENTO: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  N_LIMITE_MINIMO_PETICIONES: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'FACT_SUSCRIPCION',
  timestamps: false,
  // Other model options go here
});




console.log(Subscription === sequelizeConnection.models.Subscription); // true

export default Subscription;

