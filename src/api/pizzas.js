// src/api/pizzas.js

const API_BASE_URL = "https://backend-padreginos-production.up.railway.app";

export async function handler(req, res) {
  try {
    // Realiza a chamada para o endpoint remoto
    const response = await fetch(`${API_BASE_URL}/api/pizzas`);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados da API de pizzas");
    }

    const result = await response.json();

    // Envia os dados como resposta
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao processar a requisição", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
