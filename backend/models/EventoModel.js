'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventoModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      eventoModel.belongsToMany(models.usuarioModel, {
        through: 'eventoParticipantesModel',
        foreignKey: 'eventoId',
        otherKey: 'email',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  eventoModel.init({
    eventoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizador: {
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model: 'usuarioModel',
        key: 'email'
      },
     onUpdate: 'CASCADE',
     onDelete: 'CASCADE'
    },
    descricao: DataTypes.STRING,
    tipoEvento: {
      type: DataTypes.ENUM,
      values: ['publico', 'privado', 'academico'],
      allowNull: false
    },
    tipoLocal: {
      type: DataTypes.ENUM,
      values: ['1- Presencial', '2- Online'],
      allowNull: false
    },
    endereco: DataTypes.STRING,
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    horaInicial: {
      type: DataTypes.TIME,
      allowNull: false
    },
    duracao: {
      type: DataTypes.TIME,
      allowNull: false
    },
    participantes: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('participantes');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('participantes', JSON.stringify(value));
      }
    }
  }, {
    sequelize,
    modelName: 'eventoModel',
    timestamps: false
  });
  return eventoModel;
};