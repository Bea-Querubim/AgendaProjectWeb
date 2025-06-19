const deepEquals = require('deep-equals');
const Usuarios = require('../models/usuariomodel');


async function createUser( data ){
  const user = await Usuarios.create(data);
  if(!user) throw new Error("Não foi possivel criar o usuario!");
  return user;
};

async function listAllUsers(){
  const users = await Usuarios.findAll();
  if(!users) throw new Error("Não há usuarios cadastrados!");
  return users;
};

async function listOneUser(email) {
  const user = await Usuarios.findByPk(email);
  if(!user) throw new Error("Usuario não encontrado/ inexistente!");
  return user;
};

async function alterUserInfo(email, data) {
  const user = await listOneUser(email);

  let dataValues = data.dataValues;
  if(deepEquals(dataValues, user)) throw new Error("Informações iguais, por favor entre com valores diferentes");

  for (const index in dataValues) {
    if (dataValues[index] !== data[index]) {
      await user.update({ [index]: data[index] });
    }else{
      throw new Error("Informações iguais, por favor entre com valores diferentes");
    }
  }
  return user;
};

async function deleteUser(email) {
  const user = await listOneUser(email);
  await user.destroy();
  return true;
};

module.exports ={
  createUser,
  listAllUsers,
  listOneUser,
  alterUserInfo,
  deleteUser
}