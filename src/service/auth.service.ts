const API_URL = process.env.EXPO_PUBLIC_TMDB_API_KEY; 
import AsyncStorage from "@react-native-async-storage/async-storage";
export const registerUser = async (name, email, password) => {
  console.log("📤 Enviando requisição para API:", { name, email, password });

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    console.log("📥 Status da resposta:", response.status);

    const data = await response.json().catch(() => null);
    console.log("📥 Corpo da resposta:", data);

    if (!response.ok) {
      throw new Error(data?.message || "Erro no servidor");
    }

    return data;
  } catch (error) {
    console.log("❌ Erro na função registerUser:", error);
    throw error;
  }
};
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 400) throw new Error("Dados inválidos");
    if (response.status === 401) throw new Error("E-mail ou senha incorretos");
    throw new Error("Erro no servidor");
  }

  console.log("Login bem-sucedido:", data);
  return data;
};


export const getUserInfo = async () => {
  const token = await AsyncStorage.getItem("token");
  console.log("🔑 Token recuperado:", token);

  if (!token) throw new Error("Token não encontrado");

  const response = await fetch(`${API_URL}/auth/userInfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("📥 Status:", response.status);

  const data = await response.json().catch(() => null);
  console.log("📥 Dados recebidos:", data);

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao buscar informações do usuário");
  }

  return data;
};


export const resetPassword = async (email, newPassword, token) => {
  console.log("📤 Enviando requisição para resetar senha:", { newPassword, token });
 if (!email || !newPassword || !token) throw new Error("Parâmetros obrigatórios: email, newPassword e token");
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, newPassword, token }),
    });

    console.log("📥 Status da resposta:", response.status);
    const data = await response.json().catch(() => null);
    console.log("📥 Corpo da resposta:", data);

    if (!response.ok) {
      if (response.status === 400) throw new Error("Dados inválidos");
      if (response.status === 404) throw new Error("Usuário não encontrado");
      throw new Error("Erro no servidor");
    }

    return data;
  } catch (error) {
    console.log("❌ Erro na função resetPassword:", error);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  console.log("📤 Enviando solicitação para recuperação de senha:", { email });

  try {
    if (!email) throw new Error("O parâmetro email é obrigatório");

    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    console.log("📥 Status da resposta:", response.status);

    // Tenta ler JSON somente se Content-Length > 0
    let data = null;
    const contentLength = response.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 0) {
      data = await response.json();
    }

    console.log("📥 Corpo da resposta:", data);

    if (!response.ok) {
      if (response.status === 400) throw new Error("Solicitação inválida");
      throw new Error("Erro no servidor");
    }

    return data;
  } catch (error) {
    console.log("❌ Erro na função forgotPassword:", error);
    throw error;
  }
};

export const updateUserInfo = async (token: string, data: { name?: string; email?: string }) => {
  try {
    const filteredData: { name?: string; email?: string } = {};

    if (data.name) filteredData.name = data.name;
    if (data.email && data.email.includes('@')) filteredData.email = data.email;

    const response = await fetch(`${API_URL}/auth/updateUserInfo`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(filteredData),
    });

    const text = await response.text(); // lê como texto
    let json: any;

    try {
      json = text ? JSON.parse(text) : null; // tenta converter para JSON se houver conteúdo
    } catch {
      json = null; // não é JSON válido
    }

    if (!response.ok) {
      throw new Error(json?.message || text || 'Erro ao atualizar dados do usuário');
    }

    return json; // pode ser null se o backend não enviar nada
  } catch (error) {
    console.error('Erro na atualização do usuário:', error);
    throw error;
  }
};
