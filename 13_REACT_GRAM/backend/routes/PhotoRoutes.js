const express = require("express"); // Importa o Express

const router = express.Router(); // Cria um roteador para definir as rotas

const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  serachPhotos,
  searchPhotos,
} = require("../controllers/PhotoControllers"); // Importa a função responsável por inserir a foto

// Middlewares
const {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
} = require("../middlewares/photoValidation"); // Importa a validação dos dados da foto
const validate = require("../middlewares/handleValidation"); // Verifica se ocorreram erros nas validações
const authGuard = require("../middlewares/authGuard"); // Verifica se o usuário está autenticado
const { imageUpload } = require("../middlewares/imageUpload"); // Importa o middleware responsável pelo upload da imagem

// Routes
// Define uma rota POST para criar uma nova foto
router.post(
  "/",
  authGuard,
  imageUpload.single("image"), // Recebe uma única imagem no campo "image"
  photoInsertValidation(), // Valida os dados enviados da foto
  validate, // Verifica se as validações encontraram erros
  insertPhoto, // Executa o controller responsável por salvar a foto
);

// Define uma rota DELETE para excluir uma foto
router.delete(
  "/:id", // Endpoint da rota atraves de um id
  authGuard, // Verifica se o usuário está autenticado
  deletePhoto, // Executa o controller responsável por excluir a foto
);

router.get("/", authGuard, getAllPhotos); // Define uma rota GET protegida para buscar todas as fotos

// Busca as fotos de um usuário específico pelo ID, após verificar a autenticação
router.get("/users/:id", authGuard, getUserPhotos);

router.get(
  "/search", // Define a rota para buscar fotos
  authGuard, // Verifica se o usuário está autenticado
  searchPhotos, // Executa o controller responsável pela busca das fotos
);

// Busca uma foto específica pelo ID, após verificar se o usuário está autenticado
router.get("/:id", authGuard, getPhotoById);

// Atualiza uma foto específica pelo ID, após verificar a autenticação e validar os dados
router.put(
  "/:id",
  authGuard, // Verifica se o usuário está autenticado
  imageUpload.single("image"), // Permite receber uma nova imagem
  photoUpdateValidation(), // Valida os dados enviados
  validate, // Verifica se existem erros de validação
  updatePhoto, // Executa o controller de atualização
);

router.put("/like/:id", authGuard, likePhoto);
router.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  commentPhoto,
);

module.exports = router; // Exporta o roteador para ser usado em outros arquivos
