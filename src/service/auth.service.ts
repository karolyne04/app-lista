const API_URL = "https://shop-list-mzfv.onrender.com"; // Substitua pelo endereço do backend

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
  console.log("📤 Enviando dados de login:", { email, password });

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("📥 Status da resposta:", response.status);

    const data = await response.json().catch(() => null);
    console.log("📥 Corpo da resposta:", data);

    if (!response.ok) {
      if (response.status === 400) throw new Error("Dados inválidos");
      if (response.status === 401) throw new Error("E-mail ou senha incorretos");
      throw new Error("Erro no servidor");
    }

    return data;
  } catch (error) {
    console.log("❌ Erro na função loginUser:", error);
    throw error;
  }
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

