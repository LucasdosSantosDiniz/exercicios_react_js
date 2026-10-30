// Importa o Mongoose para trabalhar com o MongoDB
const mongoose = require("mongoose");

// Extrai o Schema do Mongoose
const { Schema } = mongoose;

// Define a estrutura dos documentos de fotos no banco de dados
const photoSchema = new Schema(
  {
    // Nome do arquivo da foto
    image: String,

    // Nome do arquivo da foto
    name: String,

    // Título da foto
    title: String,

    // Armazena os usuários que curtiram a foto
    likes: Array,

    // Armazena os comentários da foto
    comments: Array,

    // ID do usuário que criou a foto
    userId: mongoose.ObjectId,

    // Nome do usuário que publicou a foto
    username: String,
  },

  // Cria automaticamente os campos "createdAt" e "updatedAt"
  { timestamps: true },
);

// Cria o Model "Photo" usando o Schema definido acima
const Photo = mongoose.model("Photo", photoSchema);

// Exporta o Model para ser utilizado em controllers e outras partes da aplicação
module.exports = Photo;
