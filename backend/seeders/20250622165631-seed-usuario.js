'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /* Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('usuarioModel', [
      {
        nome: "Beatriz Querubim",
        email: "beatriz.querubim@email.com",
        senha: "01234"
      },
      {
        nome: "Maria Morales",
        email: "maria.morales@email.com",
        senha: "78945"
      },
      {
        nome: "Thabata Cristine",
        email: "thabata.lima@email.com",
        senha: "001122"
      },
      {
        nome: "Marcos Vieira",
        email: "marcos.vieira@email.com",
        senha: "512364"
      },
      {
        nome: "Pedro Oliveira",
        email: "pedro.oliveira@email.com",
        senha: "512364"
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /*
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('usuarioModel', null, {} );
  }
};
