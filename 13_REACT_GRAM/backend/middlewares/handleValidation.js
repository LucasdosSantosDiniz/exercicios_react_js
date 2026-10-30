// Importa a função responsável por verificar os erros das validações
const { validationResult } = require("express-validator");

// Middleware responsável por verificar se existem erros na requisição
const validate = (req, res, next) => {
  // Obtém os resultados das validações realizadas
  const erros = validationResult(req);

  // Se não houver erros, permite que a requisição continue
  if (erros.isEmpty()) {
    return next();
  }

  // Array que armazenará apenas as mensagens dos erros
  const extractedErros = [];

  // Extrai as mensagens de cada erro encontrado
  erros.array().map((err) => extractedErros.push(err.msg));

  // Retorna os erros encontrados para o cliente
  return res.status(422).json({ erros: extractedErros });
};

// Exporta o middleware para ser utilizado nas rotas
module.exports = validate;
