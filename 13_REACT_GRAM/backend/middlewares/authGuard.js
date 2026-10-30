// Importa o modelo de usuário
const User = require("../models/User");

// Importa o JWT para verificar o token de autenticação
const jwt = require("jsonwebtoken");

// Obtém a chave secreta do JWT das variáveis de ambiente
const jwtSecret = process.env.JWT_SECRET;

// Middleware responsável por proteger rotas que exigem autenticação
const authGuard = async (req, res, next) => {
  // Obtém o cabeçalho de autorização da requisição
  const authHeader = req.headers["authorization"];

  // Extrai apenas o token do formato: Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];

  // Verifica se existe um token na requisição
  if (!token) {
    return res.status(401).json({ erros: ["Acesso Negado."] });
  }

  // Verifica se o token é válido
  try {
    // Decodifica e valida o token usando a chave secreta
    const verified = jwt.verify(token, jwtSecret);

    // Busca o usuário pelo ID presente no token e remove a senha da resposta
    req.user = await User.findById(verified.id).select("-password");

    // Permite que a requisição continue para o próximo middleware ou controller
    next();
  } catch (error) {
    // Retorna erro caso o token seja inválido ou tenha expirado
    res.status(401).json({ erros: ["Token inválido."] });
  }
};

// Exporta o middleware para ser utilizado nas rotas protegidas
module.exports = authGuard;
