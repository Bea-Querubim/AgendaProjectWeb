const express = require('express');
const router = express.Router();

router.get('/eventos', (require, response)=>{
  response.status(200).send("rodando... Rota eventos...");
});

module.exports = router;