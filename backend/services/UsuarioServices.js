const deepEquals = require('deep-equals');
const Usuarios = require('../models/UsuarioModel');


async function createUser( data ){
  return await Usuarios.create(data);
};

async function listAllUsers(){
  const users = await Usuarios.findAll();
  return users;
};

async function listOneUser(email) {
  const user = await Usuarios.findByPk(email);
  return user;
};

async function alterUserInfo(email, data) {
  const user = await listOneUser(email);
  if(!user) throw new Error("Usuario não encontrado!");

  let dataValues = data.dataValues;
  if(deepEquals(dataValues, user)) throw new Error("Informações iguais, por favor entre com valores diferentes");

  for (const index in dataValues) {
    if (dataValues[index] !== data[index]) {
      await user.update({ [index]: data[index] });
    }else{
      throw new Error("Informações iguais, por favor entre com valores diferentes");    }
  }
  return user;
};

async function deleteUser(email) {
  const user = await listOneUser(email);
  if(user){
    await user.destroy();
    return true;
  }
  throw new Error("Não foi possivel deletar o usuario");
};

module.exports ={
  createUser,
  listAllUsers,
  listOneUser,
  alterUserInfo,
  deleteUser
}