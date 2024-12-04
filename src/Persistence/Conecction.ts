
import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv';
dotenv.config();

// DATABASE_HOST=bujpjhjjiuvkz4qcrlwb-mysql.services.clever-cloud.com
// DATABASE_NAME=bujpjhjjiuvkz4qcrlwb
// DATABASE_USERNAME=uvaz8ktkjujzn2f9
// DATABASE_PASSWORD=WB7lnTG87BzcwWS64vxx
// DIALECT=mysql
const dbName = process.env.DATABASE_NAME ? process.env.DATABASE_NAME.toString() : "else";
const dbUser = process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME.toString() : "else";
const dbHost = process.env.DATABASE_HOST ? process.env.DATABASE_HOST.toString() : "else";
// const dbDialect = process.env.DATABASE_DIALECT || 'mysql';
const dbPassword = process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD.toString() : "else";

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql'
});

export default sequelizeConnection;