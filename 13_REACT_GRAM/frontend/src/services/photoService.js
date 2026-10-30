import { api, requestConfig } from "../utils/config";

const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  const res = await fetch(api + "/photos", config);
  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Erro ao publicar foto.");
  }

  return responseData;
};

const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/photos/users/" + id, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erros?.[0] || data.message || "Erro ao buscar fotos.");
  }

  return data;
};

const deletePhoto = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  const res = await fetch(api + "/photos/" + id, config);
  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Erro ao deletar a foto.");
  }

  return responseData;
};

const updatePhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  const res = await fetch(api + "/photos/" + id, config);
  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Erro ao editar a foto.");
  }

  return responseData;
};

const getPhoto = async (id, token) => {
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/photos/" + id, config);
  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Erro ao encontrar a foto.");
  }

  return responseData;
};

const getPhotos = async (token) => {
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/photos", config);
  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Erro ao encontrar as fotos.");
  }

  return responseData;
};

const like = async (id, token) => {
  const config = requestConfig("PUT", null, token);

  const res = await fetch(api + "/photos/like/" + id, config);
  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Erro ao curtir a foto.");
  }

  return responseData;
};

const comment = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  const res = await fetch(api + "/photos/comment/" + id, config);
  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Erro ao comentar a foto.");
  }

  return responseData;
};

const searchPhotos = async (query, token) => {
  const config = requestConfig("GET", null, token);

  const res = await fetch(api + "/photos/search?q=" + query, config);
  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Erro ao pesquisar a foto.");
  }

  return responseData;
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  getPhotos,
  like,
  comment,
  searchPhotos,
};

export default photoService;
