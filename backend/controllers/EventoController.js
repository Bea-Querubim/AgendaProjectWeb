const service = require('../services/EventosServices');

const postEventAsync = async(request, response) => {
  try {
    await service.createEvent(request.body).then(() => {
      return response.status(201).send();
    }
    );
  } catch (e) {
    return response.status(400).send("erro: Evento já cadastrado ou Campos obrigatórios ausentes/inválidos");
  };
};

const getAllEventsAsync = async (request, response) => {
  try {
    const Events = await service.listAllEvents();
    return response.status(200).send(Events);
  } catch (e) {
    return response.status(404).send(`erro: Nenhum Evento encontrado, ${e.message}`);
  }
};

const getAllEventsByOrganizerAsync = async (request, response) => {
  try {
    const Events = await service.listAllEventsByOrganizer(request.params.email);
    return response.status(200).send(Events);
  } catch (e) {
    return response.status(404).send(`erro: Nenhum Evento encontrado, ${e.message}`);
  }
};

const getAEventByIdAsync = async (request, response) => {
  try {
    let Event = await service.listOneEvent(request.params.id);
    return response.status(200).send(Event);
  } catch (e) {
    return response.status(404).send(`erro: Evento não encontrado/existe, ${e.message}`);
  }
};

const putEventInfoAsync = async (request, response) => {
  try {
    let alterEvent = await service.alterEventInfo(request.params.id, request.body);
    return response.status(201).send(alterEvent);
  } catch (e) {
    return response.status(404).send(`erro: Não foi possive alterar dados, ${e.message}`);
  }
};

const deleteAEventAsync= async (request, response) => {
  try{
    const isDelete = await service.deleteEvent(request.params.id);
    if(isDelete) return response.status(201).send("Evento excluído com sucesso!");

  }catch(e){
    return response.status(404).send(`Erro: ${e.message}`);
  }
};

module.exports = {
  postEventAsync,
  getAllEventsAsync,
  getAEventByIdAsync,
  getAllEventsByOrganizerAsync,
  putEventInfoAsync,
  deleteAEventAsync
};