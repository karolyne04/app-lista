import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://shop-list-mzfv.onrender.com";

/**
 * ➕ Adiciona produtos a uma lista de compras
 */
export const addProductsToList = async ({ listId, userId, items }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    // Busca listId salvo
    let savedListId = listId || (await AsyncStorage.getItem("listId"));

    const payload = { userId, items };
    if (savedListId) payload.listId = savedListId;

    console.log("📤 Enviando itens da lista:", payload);

    const response = await fetch(`${API_URL}/list/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Erro ao adicionar produtos");
    }

    // Se o backend devolver um novo listId, salvamos
    if (data?.listId && data.listId !== savedListId) {
      await AsyncStorage.setItem("listId", data.listId);
      console.log("💾 Novo listId salvo:", data.listId);
    }

    console.log("✅ Produto adicionado no servidor");
    return data;
  } catch (error) {
    console.log("❌ Erro na função addProductsToList:", error);
    throw error;
  }
};

/**
 * 👀 Busca a lista de compras do usuário autenticado
 */
export const getShoppingList = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    const response = await fetch(`${API_URL}/list/my-lists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log("📥 Status GET:", response.status);
    const data = await response.json().catch(() => []);

    console.log("📥 Dados recebidos:", data);

    if (!response.ok) {
      throw new Error(data?.message || "Erro ao buscar a lista de compras");
    }

    // Como o backend devolve um array direto
    console.log("✅ Listas carregadas do servidor:", data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log("❌ Erro na função getShoppingList:", error);
    return [];
  }
};

/**
 * 🗑️ Remove um ou mais produtos de uma lista de compras
 */
export const removeProductsFromList = async ({ listId, productsIds }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    console.log("📤 Removendo produtos:", { listId, productsIds });

    const response = await fetch(`${API_URL}/list/remove-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ listId, productsIds }),
    });

    console.log("📥 Status DELETE:", response.status);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Erro ao remover produtos");
    }

    console.log("✅ Produto(s) removido(s) do servidor");
    return data;
  } catch (error) {
    console.log("❌ Erro na função removeProductsFromList:", error);
    throw error;
  }
};
