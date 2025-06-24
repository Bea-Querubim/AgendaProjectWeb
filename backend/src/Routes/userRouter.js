const express = require('express');
const router = express.Router();
const controller = require('../../controllers/UsuarioController');

router.post('/usuarios', controller.postUserAsync);
router.get('/usuarios', controller.getAllUsersAsync);
router.get('/usuarios/:id', controller.getAUserAsync);
router.put('/usuarios/:id', controller.putDataInfoAsync);
router.delete('/usuarios/:id',controller.deleteAUserAsync);

/*
router.post('/usuarios', (request, response)=>{
  Usuarios.create(request.body).then(()=>{
    response.status(200).send("Usuario cadastrado com SUcesso...");
  }).catch((e)=>{
    response.status(500).send(`Não foi possivel cadastrar o usuairo... ${e}`);
  });
});

router.get('/usuarios',async (request, response)=>{

   const users = await Usuarios.findAll();
   response.send(users);
});
*/

module.exports = router;