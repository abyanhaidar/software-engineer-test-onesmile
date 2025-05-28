require('ts-node/register');
const { sequelizeConfig } = require('./database.config');

module.exports = {
  development: sequelizeConfig,
};