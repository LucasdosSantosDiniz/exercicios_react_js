// Importa o Express
const express = require("express");

// Cria um router para organizar as rotas de usuário
const router = express.Router();

// ==================== CONTROLLERS ====================

// Importa as funções responsáveis pela lógica das operações de usuário
const {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
} = require("../controllers/UserControllers");

// ==================== MIDDLEWARES ====================

// Middleware responsável por verificar os erros das validações
const validate = require("../middlewares/handleValidation");

// Importa as regras de validação dos dados do usuário
const {
  userCreateValidation,
  loginValidaton,
  userUpdateValidation,
} = require("../middlewares/userValidations");

// Middleware que verifica se o usuário está autenticado
const authGuard = require("../middlewares/authGuard");

// Middleware responsável pelo upload da imagem de perfil
const { imageUpload } = require("../middlewares/imageUpload");

// ==================== ROTAS ====================

// Rota para cadastrar um novo usuário
// Primeiro valida os dados, depois verifica os erros e, por fim, executa o controller
router.post("/register", userCreateValidation(), validate, register);

// Rota para realizar o login
// Valida os dados antes de executar o controller de login
router.post("/login", loginValidaton(), validate, login);

// Rota para buscar o perfil do usuário autenticado
// O authGuard verifica o token antes de permitir o acesso
router.get("/profile", authGuard, getCurrentUser);

// Rota para atualizar os dados do usuário
// Verifica autenticação, valida os dados, processa a imagem e executa o controller
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update,
);

router.get("/:id", getUserById);

// Exporta o router para ser utilizado em outros arquivos
module.exports = router;
