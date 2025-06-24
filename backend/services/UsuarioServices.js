const db = require('../models');
const Usuario = db.usuarioModel;

async function createUser( data ){
  const user = await Usuario.create(data);
  if(!user) throw new Error("Não foi possivel criar o usuario!");
  return user;
};

async function listAllUsers(){
  const users = await Usuario.findAll();
  if(!users) throw new Error("Não há Usuarios cadastrados!");
  return users;
};

async function listOneUser(email) {
  const user = await Usuario.findByPk(email);
  if(!user) throw new Error("Usuario não encontrado/ inexistente!");
  return user;
};

async function alterUserInfo(email, data) {
  const user = await listOneUser(email);
  let dataValues = user.dataValues;
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

async function ensureUserExists(email) {
  const user = await Usuario.findOne({ where: { email } });
  if (!user) {
    const data ={
      email: email,
      nome: "Convidado",
      senha: "PENDING"
    }
    
    await Usuario.create(data);
  }
}

module.exports ={
  createUser,
  listAllUsers,
  listOneUser,
  alterUserInfo,
  deleteUser,
  ensureUserExists
}