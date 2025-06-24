const db = require('../models');
const eventoParticipante = db.eventoParticipantesModel;

const serviceUsuario = require('./UsuarioServices');


async function createLinkUserToEvent(eventId, userEmail, role) {
  const isExists = role !== 'organizador' ? await findAssociation(eventId, userEmail) : false;
  if (!isExists) {
    console.log('role(createLinkUserToEvent): ', role)
    await eventoParticipante.create({ eventoId: eventId, usuarioEmail: userEmail, tipo: role });
    return true;
  }
  throw new Error(`Usuario ${userEmail} já vinculado ao evento`);
};

async function findAssociation(eventId, userEmail) {
  const isExists = await eventoParticipante.findOne({
    where: { eventoId: eventId, usuarioEmail: userEmail }
  });
  //if (isExists) throw new Error(`Usuario ${userEmail} ja vinculado ao evento`);
  return !!isExists;
};

async function processUserLinks(eventId, guests) {
  for (const key in guests) {
    const role = key === 'participantes' ? 'participante' : 'organizador';
    const emails = Array.isArray(guests[key]) ? guests[key] : [guests[key]];
    console.log(emails)

    console.log('role (processUserLinks)', role);
    if (emails.length > 0) {
      let promises = emails.map(async (email) => {
        console.log(email)
        await serviceUsuario.ensureUserExists(email);
        await createLinkUserToEvent(eventId, email, role);
      });
      await Promise.all(promises);
    }
    else {
      await deleteLinkUserToEvent(eventId);
    }
  }
  return true;
};

async function listAllEventsByRole(email) {
  //suportar a bisca de eventos quando usuario é um participante ou organizador.
  const eventsByRole = await EvPart.findAll({ where: { emailUsuario: email } });
  if (!eventsByRole) throw new Error(`Erro: Não há eventos vinculados a esse email: ${email}`);
  return eventsByRole;
}

async function deleteLinkUserToEvent(eventId) {
  await eventoParticipante.destroy({
    where: { eventoId: eventId, tipo: 'participante' }
  });
}

async function addUsersToEvent(eventId, guests) {
  const oldGuests = await eventoParticipante.findAll({
    where: {eventoId: eventId, tipo: 'participante'}
  });
  const oldGuestsEmails = oldGuests.map(guest => guest.usuarioEmail);
  console.log('antes do add:', oldGuestsEmails);

  const newGuests = {
    participantes: [ ...oldGuestsEmails, ...guests.participantes]
  };

  console.log('depois do add:', newGuests);
  return newGuests;
}

module.exports = {
  processUserLinks,
  listAllEventsByRole,
  addUsersToEvent
}