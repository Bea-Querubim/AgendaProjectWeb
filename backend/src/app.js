const express = require('express');
const router = require('./Routes/mainRouter');
const sequelize = require('../config/configDatabase');
const bParser = require('body-parser');
const cors = require('cors');


sequelize.sync({ force: true })
      .then(() => console.log("Banco de dados aberto..."))
      .catch((e)=> console.log(`Não foi possivel conectar ao banco de dados...${e}`));

const app = express();
app.use(cors());
app.use(bParser.json());

app.use((request, response, next) => {
  const contentType = request.headers['content-type'] || '';
  if (
    ['POST', 'PUT', 'PATCH'].includes(request.method) &&
    !contentType.includes('application/json')
  ) {
    return response.status(415).send({ error: 'Obrigatorio-> Content-Type: application/json' });
  }
  next();
});

app.use(router);

module.exports = app;