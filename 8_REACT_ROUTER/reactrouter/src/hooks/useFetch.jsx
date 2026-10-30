import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  // Refatorando Dados
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  // Carregando Dados
  const [loading, setLoading] = useState(false);
  // Tratando erros
  const [error, setError] = useState(null);

  // Deletando Dados
  const [deleteId, setDeleteId] = useState(null);

  const httpConfig = (data, method, id) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      setMethod(method);
    }

    // DELETANDO DADOS
    if (method === "DELETE") {
      setConfig({
        method,
        headers: { "Content-type": "application/json" },
      });
      setMethod(method);
      setDeleteId(id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // 6 - loading
      setLoading(true);

      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setError("Erro ao carregar os dados !");
      }

      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  // 5 - Refatorando o POST
  useEffect(() => {
    let json = null;
    const httpRequest = async () => {
      if (method === "POST") {
        const fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        json = await res.json();
      }
      if (method === "DELETE") {
        const deleteUrl = `${url}/${deleteId}`;
        const res = await fetch(deleteUrl, config);
        json = await res.json();
      }
      setCallFetch(json);
    };
    httpRequest();
  }, [config, deleteId, url, method]);

  return { data, httpConfig, loading, error };
};

export default useFetch;
