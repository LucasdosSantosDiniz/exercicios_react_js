const User = require("../models/User"); // Importa o modelo de usuário

const bcrypt = require("bcryptjs"); // Importa o bcrypt para criptografar e comparar senhas

const jwt = require("jsonwebtoken"); // Importa o JWT para gerar tokens de autenticação

const jwtSecret = process.env.JWT_SECRET; // Obtém a chave secreta do JWT das variáveis de ambiente

// Gera um token JWT para o usuário
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

// Registra um novo usuário
const register = async (req, res) => {
  const { name, email, password } = req.body; // Obtém os dados enviados pelo usuário
  const user = await User.findOne({ email });

  // Verifica se já existe um usuário com este e-mail
  if (user) {
    res.status(422).json({ erros: ["Por favor utilize outro e-mail"] });
    return;
  }

  const salt = await bcrypt.genSalt(); // Gera um código aleatório para aumentar a segurança da senha
  const passwordHash = await bcrypt.hash(password, salt); // Criptografa a senha antes de salvá-la no banco
  const newUser = await User.create({ name, email, password: passwordHash }); // Cria o novo usuário no banco de dados

  // Verifica se o usuário foi criado com sucesso
  if (!newUser) {
    res
      .status(422)
      .json({ erros: ["Houve um erro, por favor tente mais tarde."] });

    return;
  }

  // Retorna o ID do usuário e um token de autenticação
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// Realiza o login do usuário
const login = async (req, res) => {
  const { email, password } = req.body; // Obtém o e-mail e a senha enviados
  const user = await User.findOne({ email }); // Procura o usuário pelo e-mail

  // Verifica se o usuário existe
  if (!user) {
    res.status(404).json({ erros: ["Usuário não existe."] });
    return;
  }

  // Compara a senha enviada com a senha criptografada no banco
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ erros: ["Senha inválida."] });
    return;
  }

  // Retorna os dados necessários e o token de autenticação
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Retorna os dados do usuário atualmente autenticado
const getCurrentUser = async (req, res) => {
  const user = req.user; // Obtém o usuário adicionado pelo middleware authGuard

  res.status(200).json(user); // Retorna os dados do usuário
};

// Atualiza os dados de um usuário
const update = async (req, res) => {
  const { name, bio, password } = req.body; // Obtém os dados enviados no corpo da requisição

  let profileImage = null; // Inicialmente, nenhuma imagem de perfil é definida

  // Verifica se uma nova imagem foi enviada
  if (req.file) {
    profileImage = req.file.filename; // Obtém o nome do arquivo salvo pelo Multer
  }

  const reqUser = req.user; // Obtém o usuário autenticado pelo middleware authGuard
  const user = await User.findById(reqUser._id); // Busca o usuário no banco de dados pelo ID

  // Atualiza o nome caso tenha sido enviado
  if (name) {
    user.name = name;
  }

  // Atualiza a senha caso tenha sido enviada
  if (password) {
    const salt = await bcrypt.genSalt(); // Gera um salt para aumentar a segurança da senha
    const passwordHash = await bcrypt.hash(password, salt); // Criptografa a nova senha antes de salvá-la
    user.password = passwordHash;
  }

  // Atualiza a imagem de perfil caso uma nova imagem tenha sido enviada
  if (profileImage) {
    user.profileImage = profileImage;
  }

  // Atualiza a biografia caso tenha sido enviada
  if (bio) {
    user.bio = bio;
  }

  await user.save(); // Salva as alterações no banco de dados
  const userResponse = user.toObject(); // Converte o documento do Mongoose em um objeto JavaScript
  delete userResponse.password; // Remove a senha antes de enviar os dados para o cliente
  res.status(200).json(userResponse); // Retorna os dados atualizados do usuário
};

// Busca um usuário pelo ID
const getUserById = async (req, res) => {
  const { id } = req.params; // Obtém o ID enviado pela URL

  // Busca o usuário e remove a senha do resultado
  try {
    const user = await User.findById(id).select("-password");

    // Verifica se o usuário existe
    if (!user) {
      res.status(404).json({ erros: ["Usuário não existe."] });
      return;
    }

    res.status(200).json(user); // Retorna os dados do usuário
  } catch (error) {
    res.status(404).json({ erros: ["Usuário não existe."] });
    return;
  }
};

// Exporta as funções para serem utilizadas nas rotas
module.exports = { register, login, getCurrentUser, update, getUserById };
