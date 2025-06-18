const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase')
class Usuarios extends Model {

  static associate(models) {
    /*    Usuarios.belongsToMany(models.Evento, {
          through: 'EventoParticipantes',
          foreignKey: 'usuarioEmail',
          otherKey: 'eventoId',
          onDelete: 'CASCADE'
        });*/
  };

}
Usuarios.init({
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
  },
}, {
  sequelize,
  modelName: 'Usuarios',
  timestamps: false
}
);

module.exports = Usuarios;
//teste