const Photo = require("../models/Photo"); // Importa o modelo de fotos
const User = require("../models/User"); // Importa o modelo de usuários
const mongoose = require("mongoose"); // Importa o Mongoose

// Cria a função para inserir uma foto
const insertPhoto = async (req, res) => {
  const { title } = req.body; // Obtém o título enviado na requisição
  const image = req.file.filename; // Obtém o nome do arquivo enviado
  const reqUser = req.user; // Obtém o usuário autenticado pelo authGuard
  const user = await User.findById(reqUser._id); // Busca o usuário pelo ID

  const newPhoto = await Photo.create({
    // Cria a foto no banco
    image, // Salva o nome da imagem
    title, // Salva o título
    userId: user._id, // Salva o ID do usuário
    username: user.name, // Salva o nome do usuário
  });

  if (!newPhoto) {
    return res.status(422).json({ erros: ["Tente novamente mais tarde."] }); // Retorna erro caso a foto não seja criada
  }

  res.status(201).json(newPhoto); // Retorna a foto criada
};

// Cria a função para excluir uma foto
const deletePhoto = async (req, res) => {
  const { id } = req.params; // Obtém o ID da foto enviado pela URL
  const reqUser = req.user; // Obtém o usuário autenticado

  try {
    const photo = await Photo.findById(id); // Busca a foto pelo ID

    if (!photo) {
      return res.status(404).json({ erros: ["Foto não encontrada!"] }); // Retorna erro se a foto não existir
    }

    if (!photo.userId.equals(reqUser._id)) {
      return res
        .status(403)
        .json({ erros: ["Você não tem permissão para excluir esta foto!"] }); // Impede outro usuário de excluir a foto
    }

    await Photo.findByIdAndDelete(photo._id); // Exclui a foto do banco

    // Retorna confirmação da exclusão
    res.status(200).json({
      id: photo._id,
      message: "Foto excluída com sucesso!",
    });
  } catch (error) {
    res.status(400).json({ erros: ["ID da foto inválido."] }); // Retorna erro caso o ID seja inválido
  }
};

// Cria a função responsável por buscar todas as fotos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}) // Busca todas as fotos no banco de dados
    .sort([["createdAt", -1]]) // Ordena as fotos da mais recente para a mais antiga
    .exec(); // Executa a consulta no MongoDB

  return res.status(200).json(photos); // Retorna as fotos encontradas em formato JSON
};

// Cria a função responsável por buscar as fotos de um usuário
const getUserPhotos = async (req, res) => {
  const { id } = req.params; // Obtém o ID do usuário enviado pela URL

  const photos = await Photo.find({ userId: id }) // Busca as fotos pertencentes ao usuário pelo ID
    .sort([["createdAt", -1]]) // Ordena as fotos da mais recente para a mais antiga
    .exec(); // Executa a consulta no MongoDB

  return res.status(200).json(photos); // Retorna as fotos encontradas em formato JSON
};

// Busca uma foto específica pelo ID
const getPhotoById = async (req, res) => {
  const { id } = req.params; // Obtém o ID da foto enviado pela URL

  const photo = await Photo.findById(id); // Busca a foto pelo ID no banco de dados

  if (!photo) {
    return res.status(404).json({ erros: ["Foto não encontrada!"] }); // Retorna erro caso a foto não exista
  }

  return res.status(200).json(photo); // Retorna a foto encontrada em formato JSON
};

// Atualiza o título de uma foto após verificar se o usuário tem permissão
const updatePhoto = async (req, res) => {
  const { id } = req.params; // Obtém o ID da foto pela URL
  const { title } = req.body; // Obtém o novo título
  const reqUser = req.user; // Obtém o usuário autenticado pelo authGuard

  const photo = await Photo.findById(id); // Busca a foto pelo ID

  if (!photo) {
    return res.status(404).json({ erros: ["Foto não encontrada!"] }); // Retorna erro se a foto não existir
  }

  if (!photo.userId.equals(reqUser._id)) {
    return res
      .status(403)
      .json({ erros: ["Você não tem permissão para editar esta foto!"] }); // Impede outro usuário de editar
  }

  if (title) {
    photo.title = title; // Atualiza o título
  }

  await photo.save(); // Salva a alteração no MongoDB

  res.status(200).json({
    id: photo._id,
    message: "Foto editada com sucesso!",
  });
};

const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ erros: ["Foto não encontrada!"] });
  }

  const userIndex = photo.likes.findIndex(
    (userId) => userId.toString() === reqUser._id.toString(),
  );

  if (userIndex !== -1) {
    // Remove o like se o usuário já curtiu
    photo.likes.splice(userIndex, 1);

    await photo.save();

    return res.status(200).json({
      photoId: id,
      userId: reqUser._id,
      liked: false,
      message: "Like removido com sucesso!",
    });
  }

  // Adiciona o like se o usuário ainda não curtiu
  photo.likes.push(reqUser._id);

  await photo.save();

  return res.status(200).json({
    photoId: id,
    userId: reqUser._id,
    liked: true,
    message: "Foto curtida com sucesso!",
  });
};

// Adiciona um comentário em uma foto
const commentPhoto = async (req, res) => {
  const { id } = req.params; // Obtém o ID da foto pela URL
  const reqUser = req.user; // Obtém o usuário autenticado pelo authGuard
  const { comment } = req.body; // Obtém o comentário enviado na requisição

  const photo = await Photo.findById(id); // Busca a foto pelo ID
  const user = await User.findById(reqUser.id); // Busca o usuário pelo ID

  if (!photo) {
    return res.status(404).json({ erros: ["Foto não encontrada!"] }); // Retorna erro se a foto não existir
  }

  const userComment = {
    comment, // Armazena o texto do comentário
    userName: user.name, // Armazena o nome do usuário
    userImage: user.profileImage, // Armazena a imagem de perfil do usuário
    userId: user._id, // Armazena o ID do usuário
  };

  photo.comments.push(userComment); // Adiciona o comentário à lista de comentários da foto

  await photo.save(); // Salva a alteração no banco de dados

  res.status(200).json({
    comment: userComment, // Retorna o comentário criado
    message: "Comentário postado com sucesso!", // Retorna mensagem de sucesso
  });
};

// Busca fotos pelo título
const searchPhotos = async (req, res) => {
  const { q } = req.query; // Obtém o termo de busca da URL

  const photos = await Photo.find({
    title: new RegExp(q, "i"), // Procura o termo no título sem diferenciar maiúsculas e minúsculas
  }).exec(); // Executa a consulta no MongoDB

  res.status(200).json(photos); // Retorna as fotos encontradas
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
}; // Exporta os controllers
