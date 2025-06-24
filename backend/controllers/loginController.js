const service = require('../services/UsuarioServices');

const loginUserAsync = async (require, response) => {

  const { email, senha } = require.body;
  console.log(email, senha);
  if (!email || !senha) return response.status(400).json("Erro: Email/senha são obrigatrios");

  try {
    const user = await service.listOneUser(email);

    const isEqualsPwd = user.senha === senha;
    if (!isEqualsPwd) return response.status(401).json("Erro: Senha incorreta");
    return response.status(200).json({ mensagem: 'Login realizado com sucesso', user });
  }
  catch(e){
    return response.status(500).json(`erro: ${e.message}`);
  }
};

module.exports = {
  loginUserAsync,
}