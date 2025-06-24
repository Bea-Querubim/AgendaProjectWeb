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
    const now = new Date();
    await queryInterface.bulkInsert('eventoModel', [

      {
        id: 1,
        titulo: "teste evento 1",
        organizador: "beatriz.querubim@email.com",
        descricao: "eveto de teste presencial publico",
        tipoEvento: "publico",
        tipoLocal: "1-Presencial",
        endereco: "Rua aldair macedo - 852, vila bianchi, bragança paulista, SP",
        data: now.toISOString().slice(0, 10),
        horaInicial: now.toTimeString().slice(0, 8),
        duracao: "01:00:00",
        participantes: JSON.stringify([])
      },
      {
        id: 2,
        titulo: "teste evento 2",
        organizador: "thabata.lima@email.com",
        descricao: "eveto de teste online priado",
        tipoEvento: "privado",
        tipoLocal: "2-Online",
        endereco: "meet.com/POKASN",
        data: now.toISOString().slice(0, 10),
        horaInicial: now.toTimeString().slice(0, 8),
        duracao: "0030:00",
        participantes: JSON.stringify(["maria.morales@email.com", "marcos.vieira@email.com", "pedro.oliveira@email.com", "beatriz.querubim@email.com"])
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /*Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('eventoModel', null, {});
  }
};
