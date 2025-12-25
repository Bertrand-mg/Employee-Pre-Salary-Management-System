// import { config as Dotenv } from 'dotenv';
// Dotenv();
require('dotenv/config');

const prefConfig = () => {
  const prefEnv = process.env.NODE_ENV;
  let pref;
  switch (prefEnv) {
    case 'development':
      pref = 'DEV';
      break;
    case 'testing':
      pref = 'TEST';
      break;
    case 'production':
      pref = 'PROD';
      break;
    default:
      pref = 'DEV';
  }
  return pref;
};

const databaseConnect = () => {
  const pref = prefConfig();
  return {
    database: process.env[`DB_${pref}_NAME`],
    username: process.env[`DB_${pref}_USERNAME`],
    password: process.env[`DB_${pref}_PASSWORD`],
    port: Number(process.env[`DB_${pref}_PORT`]),
    dialect: process.env[`DB_${pref}_DIALECT`],
  };
};

module.exports = databaseConnect;
