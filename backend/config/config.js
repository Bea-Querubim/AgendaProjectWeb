const sequelize = require('sequelize');
require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: process.env.DATABASE_STORAGE || './database.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:'
  },
  production: {
    dialect: 'sqlite',
    storage: process.env.DATABASE_STORAGE || './database.sqlite'
  }
};
