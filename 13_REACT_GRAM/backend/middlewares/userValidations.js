// Importa a função "body" do express-validator
const { body } = require("express-validator");

// Valida os dados enviados durante o cadastro de um usuário
const userCreateValidation = () => {
  return [
    // Valida o campo "name"
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa de no mínimo 3 caracteres"),

    // Valida o campo "email"
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido."),

    // Valida o campo "password"
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo 6 caracteres"),

    // Valida o campo de confirmação da senha
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatória.")
      .isLength({ min: 6 })
      .withMessage("A confirmação de senha precisa ter no mínimo 6 caracteres")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("As senhas não são iguais.");
        }

        return true;
      }),
  ];
};

// Valida os dados enviados durante o login
const loginValidaton = () => {
  return [
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido."),

    body("password").isString().withMessage("A senha é obrigatória."),
  ];
};

// Valida os dados enviados durante a atualização do usuário
const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome precisa de pelo menos 3 caracteres"),

    body("password")
      .optional()
      .isLength({ min: 5 })
      .withMessage("A senha precisa de pelo menos 5 caracteres"),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidaton,
  userUpdateValidation,
};
