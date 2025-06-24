const service = require('../services/EventosServices')
const serviceEvPart = require('../services/EventoParticipantesService')
//const serviceNotification = require('./services/NotificationService')

const { reorderData } = require('../utils/reorderDataEvents');

const postEventAsync = async (request, response) => {
  try {
    await service.createEvent(request.body);
    return response.status(201).send();

  } catch (e) {
    console.error('Erro real:', e);
    return response.status(400).send({mensagem: "Erro: Evento já cadastrado ou Campos obrigatórios ausentes/invalidos"});
  };
};

const getAllEventsAsync = async (request, response) => {
  try {
    const Events = await service.listAllEvents();
    return response.status(200).send(reorderData(Events));
  } catch (e) {
    return response.status(404).send({mensagem: `Erro: ${e.message}`});
  }
};

const getAllEventsByUserAsync = async (request, response) => {
  try {
    const role = request.query.role || null;
    const Events = role == null ? await service.listAllEventsByOrganizer(request.params.email) : await serviceEvPart.listAllEventsByRole(request.params.email);
    //const Events = await service.listAllEventsByOrganizer(request.params.email);
    return response.status(200).send(reorderData(Events));
  } catch (e) {
    return response.status(404).send({mensagem: `Erro: ${e.message}`});
  }
};

const getAEventByIdAsync = async (request, response) => {
  try {
    let Event = await service.listOneEvent(request.params.id);
    return response.status(200).send(reorderData(Event));
  } catch (e) {
    return response.status(404).send({mensagem: `Erro: ${e.message}`});
  }
};

const putEventInfoAsync = async (request, response) => {
  try {
    //console.log(request.params.id, request.body);
    let alterEvent = await service.alterEventInfo(request.params.id, request.body);

    //if (request.body.hasOwnProperty['participantes'] && Array.isArray(request.body.participantes.legth > 0)) await serviceNotification.sendInvitationEmails(request.body.participantes);
    const isParticipante = request.body.hasOwnProperty('participantes');
    console.log('isParticipante: ', isParticipante);

    if(isParticipante) await serviceEvPart.processUserLinks(alterEvent.id, {participantes: request.body.participantes});

    return response.status(201).send(reorderData(alterEvent));
  } catch (e) {
    return response.status(404).send({mensagem: `Erro: ${e.message}`});
  }
};

const deleteAEventAsync = async (request, response) => {
  try {
    const isDelete = await service.deleteEvent(request.params.id);
    if (isDelete) return response.status(201).send({mensagem: "Evento excluído com sucesso!"});
  } catch (e) {
    return response.status(404).send({mensagem: `Erro: ${e.message}`});
  }
};

module.exports = {
  postEventAsync,
  getAllEventsAsync,
  getAEventByIdAsync,
  getAllEventsByUserAsync,
  putEventInfoAsync,
  deleteAEventAsync
};