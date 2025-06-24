const express = require('express');
const router = require('./Routes/mainRouter');
const sequelize = require('../config/configDatabase');
const bParser = require('body-parser');

sequelize.sync({ force: true })
      .then(() => console.log("Banco de dados aberto..."))
      .catch((e)=> console.log(`Não foi possivel conectar ao banco de dados...${e}`));

const app = express();
app.use(bParser.json());

app.use(router);

module.exports = app;