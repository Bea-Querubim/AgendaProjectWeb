/*require("dotenv").config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,{
  dialect: process.env.DATABASE_TYPE, //sqlite
  storage: process.env.DATABASE_STORAGE,
  host: process.env.DATABASE_HOST
});


module.exports = sequelize;*/

require("dotenv").config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'sqlite',
    storage: process.env.DATABASE_STORAGE,
    host: process.env.DATABASE_HOST,
    //logging: false,  // Desativa os logs do Sequelize no console (opcional)
  }
);

if (process.env.DATABASE_TYPE === 'sqlite') {
  sequelize.authenticate().then(() => {
    sequelize.query('PRAGMA foreign_keys = ON;')
      .then(() => console.log('Foreign Key enforcement enabled in SQLite.'))
      .catch(console.error);
  }).catch(console.error);
}

module.exports = sequelize;
