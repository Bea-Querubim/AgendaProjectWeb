const service = require('../services/UsuarioServices');
const { dataIsValid } = require('../utils/validateData');

const loginUserAsync = async (require, response) => {
    const data = require.body;
    if(!dataIsValid(data)) return response.status(400).json({mensagem: "Erro: Ccampos invalidos/vazios"});

  try {
    const user = await service.listOneUser(data.email);

    const isEqualsPwd = user.senha === data.senha;
    if (!isEqualsPwd) return response.status(401).json("Erro: Senha incorreta");
    return response.status(200).json({ mensagem: 'Login realizado com sucesso', usuario: {nome: user.nome, email: user.email, auth: true}});
  }
  catch(e){
    return response.status(500).json(`Erro: ${e.message}`);
  }
};

module.exports = {
  loginUserAsync,
}