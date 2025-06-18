const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');

class Evento extends Model {
  static associate(models) {
    /*
    Eventos.belongsToMany(models.Usuario, {
      through: 'EventoParticipantes',
      foreignKey: 'eventoId',
      otherKey: 'email',
      onDelete: 'CASCADE'
    });*/
  };
}
Evento.init(
  {
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
    },
    descricao: DataTypes.STRING,
    tipoEvento: {
      type: DataTypes.ENUM,
      values: ['publico','privado'],
      allowNull: false
    },
    tipoLocal: {
      type: DataTypes.ENUM,
      values: ['1- Presencial','2- Online'],
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
  },
  {
    sequelize,
    modelName: 'Evento',
    timestamps: false
  }
);

module.exports = Evento;