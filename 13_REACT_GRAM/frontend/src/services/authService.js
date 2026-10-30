// Serviço responsável por realizar cadastro, login e logout dos usuários.

import { api, requestConfig } from "../utils/config";

const register = async (data) => {
  // Cria a configuração da requisição POST com os dados do usuário
  const config = requestConfig("POST", data);

  try {
    // Envia os dados para a rota de cadastro do backend
    const res = await fetch(api + "/users/register", config);

    const responseData = await res.json();

    if (res.ok) {
      // Salva os dados do usuário no navegador após o cadastro
      localStorage.setItem("user", JSON.stringify(responseData));
    }

    return responseData;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  // Remove os dados do usuário, encerrando a sessão local
  localStorage.removeItem("user");
};

const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config);

    const responseData = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(responseData));
    }

    return responseData;
  } catch (error) {
    console.log("ERRO NO LOGIN:", error);
  }
};

const authService = { register, logout, login };

export default authService;
