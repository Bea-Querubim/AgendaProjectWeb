'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventoParticipantesModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      eventoParticipantesModel.belongsTo(models.usuarioModel, {
        foreignKey: 'usuarioEmail'
      });
      eventoParticipantesModel.belongsTo(models.eventoModel, {
        foreignKey: 'eventoId'
      });
    }
  }
  eventoParticipantesModel.init({
    usuarioEmail: {
      type: DataTypes.STRING,
      references: {
        model: 'usuarioModel',
        key: 'email'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    eventoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'eventoModel',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'eventoParticipantesModel',
    timestamps: false
  });
  return eventoParticipantesModel;
};