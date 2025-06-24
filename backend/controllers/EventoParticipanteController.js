const serviceEvPart = require('../services/EventoParticipantesService')
const serviceEvents = require('../services/EventosServices');
const serviceUserEvent = require('../services/EventoParticipantesService');

//const serviceNotification = require('../services/NotificationService')


const inviteUserAsync = async (request, response) => {
  try {
    const idEvent = request.params.id;
    const guestsToLink = request.body;
    const compileGuests = await serviceUserEvent.addUsersToEvent(idEvent, guestsToLink);
    await serviceEvents.inviteUserToAEvent(idEvent, compileGuests, guestsToLink);


    return response.status(200).send("Usuário(s) convidado com sucesso!");
  } catch (e) {
    return response.status(400).send(`Erro: ${e.message}`);
  }
};

/*async function listEventsByUserRole(userEmail, role) {
  const participations = await eventoParticipante.findAll({
    where: {
      userEmail,
      role
    },
    include: [{ model: db.eventoModel }]
  });

  return participations.map(p => p.eventoModel);
}
  */
/*const service = require('../services/EventoParticipantesService');

const putUserToAEventAsync = async (request, response) => {
  //usuario nao precisa estar cadastrado no site, ele sera notificado via email - adapação da documentação
  try{
    const sendInvite = await service.inviteUserToAEvent(request.params.id, request.body);

    if(sendInvite) return response.status(200).send("mensagem: Usuário(s) convidado com sucesso");
  }catch(e){
    return response.status(400).send(`Erro: ${e}`)
  }
};*/

module.exports = {
  inviteUserAsync
}