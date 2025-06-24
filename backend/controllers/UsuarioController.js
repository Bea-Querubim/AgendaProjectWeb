const service = require('../services/UsuarioServices');

const postUserAsync = async (request, response) => {
  try {
    await service.createUser(request.body).then(() => {
      return response.status(201).send();
    }
    );
  } catch (e) {
    return response.status(400).send("erro: Usuario já cadastrado ou campos inválidos");
  };

  /* await service.criarUsuario(request.body).then(() => {
     return response.status(200).send("Usuario cadastrado com SUcesso...");
   }).catch((e) => {
     return response.status(500).send(`Não foi possivel cadastrar o usuairo... ${e}`);
   });*/
};

const getAllUsersAsync = async (request, response) => {
  try {
    const users = await service.listAllUsers();
    return response.status(200).send(users);
  } catch (e) {
    return response.status(404).send(`${e.message}`);
  }
};

/*async (request, response)=>{

   const users = await Usuarios.findAll();
   response.send(users);
});
*/
const getAUserAsync = async (request, response) => {
  try {
    let user = await service.listOneUser(request.params.id);
    return response.status(200).send(user);
  } catch (e) {
    return response.status(404).send(`${e.message}`);
  }
};

const putDataInfoAsync = async (request, response) => {
  try {
    let alterUser = await service.alterUserInfo(request.params.id, request.body);
    return response.status(201).send(alterUser);
  } catch (e) {
    return response.status(404).send(`${e.message}`);
  }
};
  /*const user = await Usuarios.findOne({ where: { email: request.params.id } });
  if (!user) return response.status(404).send("Usuario não encontrado!");

  const userData = user.dataValues;
  const data = request.body;
  //console.log(userData);
  //console.log(data);

  if (deepEqual(userData, data)) return response.status(500).send("Não foi possível alterar, insira valores diferentes!");

  for (const index in userData) {
    //console.log(userData[index])
    //console.log(data[index])
    //console.log(index)
    if (userData[index] !== data[index]) {
      await user.update({ [index]: data[index] });
    }else{
      return response.status(500).send("Não foi possível alterar, insira valores diferentes!");
    }
  }
  return response.status(200).send(`Usuário atualizado com sucesso!`);*/


const deleteAUserAsync = async (request, response) => {
  try{
    const isDelete = await service.deleteUser(request.params.id);
    if(isDelete) return response.status(201).send("Usuário excluído com sucesso!");

  }catch(e){
    return response.status(404).send(`Erro: ${e.message}`);
  }
};/*const user = await getAEspecificUserAsync();
  const user = await Usuarios.findByPk(request.params.id);
  if (!user) {
    return response.status(404).send("Usuario nao encontrado!");
  }
  await user.destroy();
  return response.status(200).send("Usuario excluido!");
};*/

module.exports = {
  postUserAsync,
  getAllUsersAsync,
  getAUserAsync,
  putDataInfoAsync,
  deleteAUserAsync
};