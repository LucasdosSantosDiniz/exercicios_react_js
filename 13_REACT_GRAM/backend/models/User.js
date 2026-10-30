// Importa o Mongoose para trabalhar com o MongoDB
const mongoose = require("mongoose");

// Extrai o Schema do Mongoose
const { Schema } = mongoose;

// Define a estrutura dos documentos de usuários no banco de dados
const userSchema = new Schema(
  {
    // Nome do usuário
    name: String,

    // E-mail do usuário
    email: String,

    // Senha do usuário armazenada de forma criptografada
    password: String,

    // URL ou caminho da imagem de perfil
    profileImage: String,

    // Biografia ou descrição do usuário
    bio: String,
  },

  // Cria automaticamente os campos "createdAt" e "updatedAt"
  { timestamps: true },
);

// Cria o Model "User" usando o Schema definido acima
const User = mongoose.model("User", userSchema);

// Exporta o Model para ser utilizado em controllers e outras partes da aplicação
module.exports = User;
