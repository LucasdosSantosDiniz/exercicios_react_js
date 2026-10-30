const multer = require("multer"); // Importa o Multer, responsável pelo upload de arquivos
const path = require("path"); // Importa o módulo path para trabalhar com extensões de arquivos

// Configura onde e como as imagens serão armazenadas
const imageStore = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = ""; // Define inicialmente a pasta como vazia

    if (req.baseUrl.includes("users")) {
      folder = "users"; // Se a rota for de usuários, salva na pasta "users"
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos"; // Se a rota for de fotos, salva na pasta "photos"
    }

    cb(null, `uploads/${folder}`); // Define o caminho onde o arquivo será salvo
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname), // Usa a data atual como nome e mantém a extensão
    );
  },
});

// Configura o upload de imagens
const imageUpload = multer({
  storage: imageStore, // Define o armazenamento configurado acima

  fileFilter(req, file, cb) {
    // Permite somente arquivos PNG, JPG ou JPEG
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
      return cb(new Error("Por favor envie uma imagem em PNG, JPG ou JPEG")); // Rejeita formatos diferentes
    }

    cb(null, true); // Aceita o arquivo
  },
});

module.exports = { imageUpload }; // Exporta a configuração de upload
