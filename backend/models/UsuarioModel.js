'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarioModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuarioModel.belongsToMany(models.eventoModel, {
        through: 'EventoParticipantesModel',
        foreignKey: 'usuarioEmail',
        otherKey: 'eventoId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  usuarioModel.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'usuarioModel',
    tableName: 'usuarioModel',
    timestamps: false
  });
  return usuarioModel;
};