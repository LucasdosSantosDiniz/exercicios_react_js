const { body } = require("express-validator"); // Importa a função body para validar os campos

// Cria a função responsável pelas validações da foto
const photoInsertValidation = () => {
  return [
    body("title") // Seleciona o campo "title"
      .notEmpty() // Verifica se o campo não está vazio
      .withMessage("O título é obrigatório") // Mensagem caso esteja vazio
      .isLength({ min: 3 }) // Verifica se possui pelo menos 3 caracteres
      .withMessage("Precisa ter no mínimo 3 caracteres"), // Mensagem caso tenha menos de 3 caracteres

    // Cria uma validação personalizada para a imagem
    body("image").custom((value, { req }) => {
      // Verifica se nenhuma imagem foi enviada
      if (!req.file) {
        throw new Error("A imagem é obrigatória!"); // Retorna um erro caso não tenha imagem
      }

      return true; // Informa que a validação foi aprovada
    }),
  ];
};

// Valida os dados enviados para atualizar uma foto
const photoUpdateValidation = () => {
  return [
    body("title") // Seleciona o campo "title"
      .optional() // Permite atualizar a foto sem enviar um novo título
      .isString() // Verifica se o título é uma string
      .withMessage("O título deve ser um texto!") // Mensagem caso não seja texto
      .isLength({ min: 3 }) // Verifica se possui no mínimo 3 caracteres
      .withMessage("O título precisa ter no mínimo 3 caracteres"), // Mensagem caso tenha menos de 3 caracteres
  ];
};

const commentValidation = () => {
  return [
    body("comment") // Seleciona o campo "title"
      .isString() // Verifica se o título é uma string
      .withMessage("O comentaro é obrigatorio!"), // Mensagem caso não seja texto
  ];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
}; // Exporta a função de validação
