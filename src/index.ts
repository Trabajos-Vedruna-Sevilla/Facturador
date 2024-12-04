import express from 'express'
import sequelizeConnection from './Persistence/Conecction'
import PaymentMethod from './Persistence/Models/PaymentMethod'
import Period from './Persistence/Models/Period'
import Subscription from './Persistence/Models/Subscription'
import cors from 'cors';
import * as dotenv from 'dotenv';
const { Op } = require("sequelize");
dotenv.config();
const dbHost = process.env.DATABASE_PASSWORD;

// Subscription.hasOne(Period);
// Period.belongsTo(Subscription, {foreignKey: 'SUS_X_SUSCRIPCION',targetKey: 'X_SUSCRIPCION'});

const app = express()
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json()) // middleware que transforma la red.body a un json 
const PORT = 8082
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
// Controladores de Metodos de pago
app.get('/paymentMethods', async (_req, res) => {
  console.log('someone pinged here!!!')
  let e;
  try {
    await sequelizeConnection.authenticate();
    e = 'Connection has been established successfully.';
  } catch (error) {
    e = dbHost + 'Unable to connect to the database: ' + error;
  }
  console.log(e);
  const paymentMethods = await PaymentMethod.findAll();

  // Mapear cada instancia a su representación JSON
  const paymentMethodsJSON = paymentMethods.map(paymentMethod => paymentMethod.toJSON());

  res.json(paymentMethodsJSON);
})

// Controladores de Periodos
app.get('/periods', async (_req, res) => {
  console.log('someone pinged here!!!')
  let e;
  try {
    await sequelizeConnection.authenticate();
    e = 'Connection has been established successfully.';
  } catch (error) {
    e = 'Unable to connect to the database: ' + error;
  }
  console.log(e);
  const periods = await Period.findAll();

  // Mapear cada instancia a su representación JSON
  const periodsJSON = periods.map(period => period.toJSON());

  res.json(periodsJSON);
})


// Controladores de Suscripcion
app.get('/subscribtions', async (_req, res) => {
  console.log('someone pinged here!!!')
  let e;
  try {
    await sequelizeConnection.authenticate();
    e = 'Connection has been established successfully.';
  } catch (error) {
    e = 'Unable to connect to the database: ' + error;
  }
  console.log(e);
  const subscriptions = await Subscription.findAll();

  // Mapear cada instancia a su representación JSON
  const subscriptionJSON = subscriptions.map(subscription => subscription.toJSON());

  res.json(subscriptionJSON);
})




// Controlador Subscriptons from payment method
app.get('/subscribtionsByPaymentMethod/:id', async (req, res) => {
  const paymentMethodId = req.params.id;
  console.log(paymentMethodId);
  let e;
  try {
    await sequelizeConnection.authenticate();
    e = 'Connection has been established successfully.';
  } catch (error) {
    e = 'Unable to connect to the database: ' + error;
  }
  console.log(e);
  const subscriptions = await Subscription.findAll({
    where: {
      MET_X_METPAGO: paymentMethodId
    }
  });

  const subscriptionJSON = subscriptions.map(subscription => subscription.toJSON());

  res.json(subscriptionJSON);
})


// Controlador Subscribtions by number of request
app.get('/subscribtionsByNumOfRequest/:request/:methpay', async (req, res) => {
  const numRequest = req.params.request;
  const paymentMethod = req.params.methpay;
  const { Op } = require("sequelize");

  console.log(numRequest);
  let e;
  try {
    await sequelizeConnection.authenticate();
    e = 'Connection has been established successfully.';
  } catch (error) {
    e = 'Unable to connect to the database: ' + error;
  }
  console.log(e);
  const subscriptions = await Subscription.findAll({
    where: {
      N_LIMITE_MINIMO_PETICIONES: { [Op.lte]: numRequest },
      MET_X_METPAGO: paymentMethod
    },
    order: [['N_LIMITE_MINIMO_PETICIONES', 'DESC']],
    limit: 1
  })

  const subscriptionJSON = subscriptions.map(subscription => subscription.toJSON());

  res.json(subscriptionJSON);
})


// Controlador Periods availables by date
app.get('/periodsByDatesAvailable/:date', async (req, res) => {
  const date = req.params.date;
  const { Op } = require("sequelize");

  console.log(date);
  let e;
  try {
    await sequelizeConnection.authenticate();
    e = 'Connection has been established successfully.';
  } catch (error) {
    e = 'Unable to connect to the database: ' + error;
  }
  console.log(e);
  const periods = await Period.findAll({
    where: {
      F_FIN: { [Op.gte]: date }
    }
  })

  //const periodJSON = periods.map(period => period.toJSON());
  const periodJSON = periods.map(period => {
    const lowerCaseKeys = Object.fromEntries(
      Object.entries(period.toJSON()).map(([key, value]) => [key.toLowerCase(), value])
    );
    return lowerCaseKeys;
  });

  res.json(periodJSON);
})

// Controlador Periods availables
app.get('/getPeriodsAvailable', async (_req, res) => {
  let e;
  try {
    await sequelizeConnection.authenticate();
    e = 'Connection has been established successfully.';
  } catch (error) {
    e = 'Unable to connect to the database: ' + error;
  }
  console.log(e);
  const periods = await Period.findAll({
    attributes: ['F_INI', 'F_FIN'],
    group: ['F_FIN'],
  })

  const periodJSON = periods.map(period => {
    const lowerCaseKeys = Object.fromEntries(
      Object.entries(period.toJSON()).map(([key, value]) => [key.toLowerCase(), value])
    );
    return lowerCaseKeys;
  });

  res.json(periodJSON);
})

// Controlador Price and Discount availables
app.get('/getPricesAndDiscountsAvailableByPeriods/:paymentMethod/:requestNum', async (req, res) => {
  const paymentMethod = req.params.paymentMethod;
  const requestNum = req.params.requestNum;
  const a = req.header('periodDate')
  const periodDate = req.headers.periodDate;
  console.log(a + "!" + periodDate);
  let e;
  try {
    await sequelizeConnection.authenticate();
    e = 'Connection has been established successfully.';
  } catch (error) {
    e = 'Unable to connect to the database: ' + error;
  }
  console.log(e);
  const periods = await Period.findAll({
    attributes: ['F_FIN', 'N_IMPORTE_PETICION', 'F_INI'],
    limit: 1,
    include: [
      {
        model: Subscription,
        where: {
          MET_X_METPAGO: paymentMethod,
          N_LIMITE_MINIMO_PETICIONES: {
            [Op.lte]: requestNum, // Operador Sequelize para "menor o igual que"
          },
        },
      },
    ],
    where: {
      F_FIN: {
        [Op.lte]: a, // Comparación exacta de fecha
      },
    },
  });

  const periodJSON = periods.map(period => {
    const { Subscription, ...rest } = period.toJSON();
    return {
      ...rest,
      met_x_metpago: Subscription.MET_X_METPAGO,
      n_porcentaje_descuento: Subscription.N_PORCENTAJE_DESCUENTO
    };
  });
  const periodJSON2 = periodJSON.map(period => {
    const lowerCaseKeys = Object.fromEntries(
      Object.entries(period).map(([key, value]) => [key.toLowerCase(), value])
    );
    return lowerCaseKeys;
  });


  res.json(periodJSON2[0]);
})


// 
// app.get('/getPricesAndDiscountsAvailableByPeriods/:paymentMethod/:requestNum', async (req, res) => {
//   const paymentMethod = req.params.paymentMethod;
//   const requestNum = req.params.requestNum;
//   const periodDate = req.headers.periodDate;
//   console.log(periodDate);

//   let connectionStatus;
//   try {
//     await sequelizeConnection.authenticate();
//     connectionStatus = 'Connection has been established successfully.';
//   } catch (error) {
//     connectionStatus = 'Unable to connect to the database: ' + error;
//   }
//   console.log(connectionStatus);

//   try {
//     const periods = await Period.findAll({
//       attributes: ['F_FIN', 'N_IMPORTE_PETICION'],
//       include: [
//         {
//           model: Subscription,
//           where: {
//             MET_X_METPAGO: paymentMethod,
//           },
//         },
//       ],
//       where: {
//         F_FIN: {
//           [Op.eq]: periodDate, // Comparación exacta de fecha
//         },
//         '$Subscription.N_LIMITE_MINIMO_PETICIONES$': {
//           [Op.lte]: requestNum,
//         },
//       },
//     });

//     const periodJSON = periods.map(period => period.toJSON());

//     res.json(periodJSON);
//   } catch (error) {
//     console.error('Error fetching periods:', error);
//     res.status(500).json({ error: 'An error occurred while fetching periods' });
//   }
// });
app.get('/p', async (_req, res) => {
  let e;
  try {
    await sequelizeConnection.authenticate();
    e = 'Connection has been established successfully.';
  } catch (error) {
    e = 'Unable to connect to the database: ' + error;
  }
  console.log(e);
  const results = await Period.findAll({
    include: [
      {
        model: Subscription,
        associationType: 'hasOne',
        required: true,
        where: {
          MET_X_METPAGO: 2,
        },
      },
    ],
  });

  const periodJSON = results.map(results => results.toJSON());

  res.json(periodJSON);
})