const express = require('express');
const router = express.Router();
const controllerEvents = require('../../controllers/EventoController')

router.post('/eventos', controllerEvents.postEventAsync);
router.get('/eventos', controllerEvents.getAllEventsAsync);
router.get('/eventos/:id', controllerEvents.getAEventByIdAsync);
router.put('/eventos/:id', controllerEvents.putEventInfoAsync);
router.delete('/eventos/:id', controllerEvents.deleteAEventAsync);

/*(request, response)=>{
  /*response.status(200).send("rodando... Rota eventos...");
  Eventos.findAll().then(()=>{
    //response.status(204||200);
    if(response.statusCode(204||200)){
      let resp = response.json();
      send(resp.json.toString());
    }
  }).catch((Error)=>{
    response.statusCode(!204||!201).send(new Error("Erro ao recuperar dados...", Error.message));
  });
});*/

router.post('/eventos',(request, response)=>{
Eventos.create(request.body).then(()=>{
    response.status(200).send("Evento criado com SUcesso...");
  }).catch((e)=>{
    response.status(500).send(`Não foi possivel criar o evento... ${e}`);
  });
});
module.exports = router;