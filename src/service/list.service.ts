import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://shop-list-mzfv.onrender.com";

export const getCategories = async (category) => {
  console.log("📤 Buscando produtos da categoria:", category);

  try {
    // Pegando token salvo no login
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await fetch(
      `${API_URL}/list/categories?category=${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ Enviando token
        },
      }
    );

    console.log("📥 Status:", response.status);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 404) throw new Error("Nenhum produto encontrado");
      throw new Error("Erro ao buscar produtos");
    }

    return data;
  } catch (error) {
    console.log("❌ Erro na função getCategories:", error);
    throw error;
  }
};
