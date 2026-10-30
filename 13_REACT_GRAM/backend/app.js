// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Importa o Express para criar o servidor
const express = require("express");

// Importa o módulo path para trabalhar com caminhos de arquivos
const path = require("path");

// Importa o CORS para permitir requisições vindas do frontend
const cors = require("cors");

// Obtém a porta definida no arquivo .env
const port = process.env.PORT;

// Cria a aplicação Express
const app = express();

// ==================== MIDDLEWARES ====================

// Permite que o Express receba dados no formato JSON
app.use(express.json());

// Permite receber dados enviados através de formulários
app.use(express.urlencoded({ extended: false }));

// Configura o CORS para permitir requisições do frontend
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

// ==================== ARQUIVOS ESTÁTICOS ====================

// Permite acessar as imagens armazenadas na pasta "uploads"
// através da URL /uploads/*
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==================== BANCO DE DADOS ====================

// Importa e executa a configuração de conexão com o MongoDB
require("./config/db.js");

// ==================== ROTAS ====================

// Importa o router principal da aplicação
const router = require("./routes/Router.js");

// Registra as rotas na aplicação Express
app.use(router);

// ==================== SERVIDOR ====================

// Inicia o servidor na porta definida no arquivo .env
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
