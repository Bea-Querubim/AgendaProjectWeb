const deepEquals = require('deep-equals');
const Eventos = require('../models/eventomodel');

async function createEvent(data) {
  const event = await Eventos.create(data);
  if (!event) throw new Error("Erro: Não foi possivel criar o Evento");
  return event;
};

async function listAllEvents() {
  const events = Eventos.findAll();
  if (!events) throw new Error("Erro: Não há Eventos");
  return events;
};

async function listAllEventsByOrganizer(email) {
  const eventsByOrganizer = Eventos.findAll({ where: { organizador: email } });
  if (!eventsByOrganizer) throw new Error(`Erro: Não há eventos desse Organizador: ${email}`);
  return eventsByOrganizer;
};

async function listOneEvent(idEvent) {
const event = Eventos.finByPk(idEvent);
if(!event) throw new Error(`Erro: Evento não existe/ id incorreto!`);
return event;
};

async function alterEventInfo(idEvent, dataEvent) {
  const event = await listOneEvent(idEvent);

  let dataValues = dataEvent.dataValues;
  if(deepEquals(dataValues, event)) throw new Error("Erro: Informações iguais, por favor entre com valores diferentes");

  for (const index in dataValues) {
    if (dataValues[index] !== dataEvent[index]) {
      await event.update({ [index]: dataEvent[index] });
    }else{
      throw new Error("Erro: Informações iguais, por favor entre com valores diferentes");
    }
  }
  return event;
};

async function deleteEvent(idEvent) {
  const event = await listOneEvent(idEvent);
  event.destroy();
  return true;
};

module.exports = {
  createEvent,
  listAllEvents,
  listAllEventsByOrganizer,
  listOneEvent,
  alterEventInfo,
  deleteEvent,
};