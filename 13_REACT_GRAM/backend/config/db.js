const mongoose = require("mongoose"); // Importa o Mongoose, responsável pela conexão com o MongoDB

const dbUser = process.env.DB_USER; // Obtém o usuário do banco das variáveis de ambiente

const dbPassword = process.env.DB_PASS; // Obtém a senha do banco das variáveis de ambiente

const dns = require("dns"); // Importa o módulo DNS do Node.js

dns.setServers(["8.8.8.8"]); // Define o servidor DNS do Google para ajudar na resolução do MongoDB Atlas

const conn = async () => {
  // Cria a função assíncrona responsável pela conexão com o banco

  try {
    const dbConn = await mongoose.connect(
      // Realiza a conexão com o MongoDB Atlas
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.x6ng8vy.mongodb.net/`,
    );

    console.log("Conectado!"); // Exibe uma mensagem quando a conexão é realizada com sucesso

    return dbConn; // Retorna a conexão estabelecida
  } catch (error) {
    console.log(error); // Exibe o erro caso a conexão com o banco falhe
  }
};

conn(); // Executa a função de conexão com o banco

module.exports = conn; // Exporta a função de conexão para outros arquivos
