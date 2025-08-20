import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_TMDB_API_KEY;


export const createList = async ({ userId, name, items = [] }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    const formattedItems = items.map(item => ({
      idProduct: item.id,   // string
      quantity: item.quantity || 1, // número
    }));

    const payload = { userId, name, items: formattedItems };

    console.log("📤 Criando nova lista:", payload);

    const response = await fetch(`${API_URL}/list/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Erro ao criar lista");
    }

    const listId = data?.listId || data?.id;
    if (listId) {
      await AsyncStorage.setItem("listId", listId);
      await AsyncStorage.setItem("listName", name); // salva o nome também
      console.log("💾 Novo listId salvo:", listId);
    }

    console.log("✅ Lista criada com sucesso");
    return { ...data, listId };
  } catch (error) {
    console.error("❌ Erro ao criar lista:", error);
    throw error;
  }
};



/**
 * ➕ Adiciona produtos a uma lista de compras
 *//**
 * ➕ Adiciona produtos a uma lista de compras
 */


 interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface AddProductsParams {
  listId?: string;
  listName?: string;
  userId: string;
  products: Product[]; // recebe diretamente os produtos
  defaultQuantity?: number; // opcional, padrão 1
}

export const addProductsToList = async ({
  listId,
  listName,
  userId,
  products,
  defaultQuantity = 1,
}: AddProductsParams) => {
  try {
    if (!products || products.length === 0) throw new Error("Nenhum produto para adicionar");

    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    const savedListId = listId || (await AsyncStorage.getItem("listId"));
    const savedListName = listName || (await AsyncStorage.getItem("listName")) || "Minha Lista de Compras";

    if (!savedListId) throw new Error("ID da lista não encontrado");

    // Mapeia produtos para o formato correto da API
    const items = products.map(product => ({
      idProduct: product.id,
      quantity: defaultQuantity,
    }));

    const payload = {
      id: savedListId,
      listId: savedListId,
      name: savedListName,
      userId,
      items,
    };

    console.log("📤 Enviando produtos da lista:", payload);

    const response = await fetch(`${API_URL}/list/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Erro ao adicionar produtos");
    }

    // Atualiza listId e listName caso a API retorne algo novo
    if (data?.listId && data.listId !== savedListId) {
      await AsyncStorage.setItem("listId", data.listId);
      console.log("💾 Novo listId salvo:", data.listId);
    }
    if (data?.name && data.name !== savedListName) {
      await AsyncStorage.setItem("listName", data.name);
      console.log("💾 Nome da lista atualizado:", data.name);
    }

    console.log("✅ Produto(s) adicionado(s) com sucesso");
    return data;
  } catch (error) {
    console.error("❌ Erro na função addProductsToList:", error);
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

export const getProductById = async (id) => {
  try {
    if (!id) throw new Error("ID do produto não fornecido");

    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    const response = await fetch(`${API_URL}/list/products?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📥 Status GET:", response.status);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Erro ao buscar o produto");
    }

    console.log("✅ Produto encontrado:", data);
    return data;
  } catch (error) {
    console.error("❌ Erro na função getProductById:", error);
    return null;
  }
};