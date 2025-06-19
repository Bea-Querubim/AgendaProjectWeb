'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    await queryInterface.createTable('eventoParticipantesModel', {
      usuarioEmail: {
        type: Sequelize.STRING,
        references: {
          model: 'usuarioModel',
          key: 'email'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      eventoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'eventoModel',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
      {
        timestamps: false
      }
    );
  },

  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable('users');
    await queryInterface.dropTable('eventoParticipantesModel');
  }
};
