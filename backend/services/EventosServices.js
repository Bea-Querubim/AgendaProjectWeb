const db = require('../models');
const Eventos = db.eventoModel;
const eventoParticipanteService = require('./EventoParticipantesService')

async function createEvent(data) {
  
  const event = await Eventos.create(data);
  if (!event) throw new Error("Não foi possivel criar o Evento");

  const guests = {
    organizador: event.organizador,
    participantes: data.participantes || []
  };

  await eventoParticipanteService.processUserLinks(event.id, guests);
  return event;
};

async function listAllEvents(filters = {}) {
  const events = await Eventos.findAll({
    where: filters
  });
  if (!events) throw new Error("Não há Eventos");
  return events;
};

async function listAllEventsByOrganizer(email) {
  const eventsByOrganizer = await Eventos.findAll({ where: { organizador: email } });
  if (!eventsByOrganizer) throw new Error(`Não há eventos desse Organizador: ${email}`);
  return eventsByOrganizer;
};

async function listOneEvent(idEvent) {
  const event = await Eventos.findByPk(idEvent);
  if (!event) throw new Error(`Evento não existe/ id incorreto!`);
  return event;
};

async function alterEventInfo(idEvent, dataEvent) {
  const event = await listOneEvent(idEvent);
  if (!event) throw new Error("Evento não existe/ id incorreto!");

  let dataValues = event.dataValues;

  for (const index in dataValues) {
    if (dataValues[index] !== dataEvent[index]) {
      await event.update({ [index]: dataEvent[index] });
    } else {
      throw new Error("Informações iguais, por favor entre com valores diferentes");
    }
  }
  return event;
};

async function deleteEvent(idEvent) {
  const event = await listOneEvent(idEvent);
  event.destroy();
  return true;
};

async function inviteUserToAEvent(idEvent, compileGuests, guestsToLink) {
  /*const event = await listOneEvent(idEvent);
  if (!event) throw new Error(`Erro: Evento não existe/ id incorreto!`);

  if (guests.hasOwnProperty('participantes') && guests['participantes'].length > 0) {
    await event.update(guests);
    return true;
  } else {
    throw new Error("Usuário não encontrado ou já convidado");
  }*/
  const changeEvent = await alterEventInfo(idEvent, compileGuests);
  const isLink = await eventoParticipanteService.processUserLinks(idEvent, guestsToLink);
  //await sendNotification (guestsToLink);

  if(!changeEvent || !isLink) throw new Error("Usuário não encontrado ou já convidado");
  return true;
};

module.exports = {
  createEvent,
  listAllEvents,
  listAllEventsByOrganizer,
  listOneEvent,
  alterEventInfo,
  deleteEvent,
  inviteUserToAEvent
};