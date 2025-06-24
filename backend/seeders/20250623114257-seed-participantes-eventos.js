'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /*Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('eventoParticipantesModel', [
      {
        usuarioEmail: "beatriz.querubim@email.com",
        eventoId: 1,
        tipo: 'organizador'
      },
      {
        usuarioEmail: "thabata.lima@email.com",
        eventoId: 2,
        tipo: 'organizador'
      },
      {
        usuarioEmail: "beatriz.querubim@email.com",
        eventoId: 2,
        tipo: 'participante'
      },
      {
        usuarioEmail: "maria.morales@email.com",
        eventoId: 2,
        tipo: 'participante'
      },{
        usuarioEmail: "marcos.vieira@email.com",
        eventoId: 2,
        tipo: 'participante'
      },{
        usuarioEmail: "pedro.oliveira@email.com",
        eventoId: 2,
        tipo: 'participante'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /*Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('eventoParticipantesModel', null, {});
  }
};
