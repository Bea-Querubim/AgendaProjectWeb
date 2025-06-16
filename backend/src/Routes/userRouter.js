const express = require('express');
const router = express.Router();

router.get('/usuario', (require, response)=>{
  response.status(200).send("rodando... Rota usuarios");
});

module.exports = router;