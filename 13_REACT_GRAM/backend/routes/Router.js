// Importa o Express
const express = require("express");

// Cria o router principal da aplicação
const router = express();

// Importa as rotas relacionadas aos usuários

// Todas elas ficarão disponíveis a partir de "/api/users"
router.use("/api/users", require("./UserRoutes"));

router.use("/api/photos", require("./PhotoRoutes"));

// Rota de teste para verificar se a API está funcionando
router.get("/", (req, res) => {
  // Envia uma mensagem como resposta
  res.send("API Working !");
});

// Exporta o router para ser utilizado no arquivo principal do servidor
module.exports = router;
