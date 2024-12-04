const { DataTypes } = require('sequelize');
import sequelizeConnection from '../Conecction'

const PaymentMethod = sequelizeConnection.define('PaymentMethod', {
  // Model attributes are defined here
  X_METODOPAGO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  D_METODOPAGO: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  tableName: 'FACT_METODOS_PAGO',
  timestamps: false,
  // Other model options go here
});


console.log(PaymentMethod === sequelizeConnection.models.PaymentMethod); // true
export default PaymentMethod;

