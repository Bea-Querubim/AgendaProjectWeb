'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarioModel', {
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
      {
        timestamps: false
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarioModel');
  }
};