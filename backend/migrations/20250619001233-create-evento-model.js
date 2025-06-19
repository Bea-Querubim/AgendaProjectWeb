'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('eventoModel', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizador: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'usuarioModel',
          key: 'email'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      descricao: Sequelize.STRING,
      tipoEvento: {
        type: Sequelize.ENUM,
        values: ['publico', 'privado', 'academico'],
        allowNull: false
      },
      tipoLocal: {
        type: Sequelize.ENUM,
        values: ['1- Presencial', '2- Online'],
        allowNull: false
      },
      endereco: Sequelize.STRING,
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      horaInicial: {
        type: Sequelize.TIME,
        allowNull: false
      },
      duracao: {
        type: Sequelize.TIME,
        allowNull: false
      },
      participantes: {
        type: Sequelize.TEXT,
        allowNull: true,
        get() {
          const rawValue = this.getDataValue('participantes');
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue('participantes', JSON.stringify(value));
        }
      }
    },
      {
        timestamps: false
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('eventoModel');
  }
};