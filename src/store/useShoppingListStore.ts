import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useShoppingListStore = create((set) => ({
  shoppingList: [],

  addProductToList: (product) =>
    set((state) => {
      const existingItem = state.shoppingList.find((item) => item.id === product.id);

      if (existingItem) {
        // Se já existe, aumenta a quantidade
        return {
          shoppingList: state.shoppingList.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Se não existe, adiciona com quantidade 1
        return {
          shoppingList: [...state.shoppingList, { ...product, quantity: 1 }],
        };
      }
    }),

  removeProductFromList: (id) =>
    set((state) => {
      const existingItem = state.shoppingList.find((item) => item.id === id);

      if (!existingItem) return state;

      if (existingItem.quantity > 1) {
        // Diminui quantidade
        return {
          shoppingList: state.shoppingList.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        };
      } else {
        // Remove da lista se quantidade for 1
        return {
          shoppingList: state.shoppingList.filter((item) => item.id !== id),
        };
      }
    }),

    loadShoppingList: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const response = await fetch("https://shop-list-mzfv.onrender.com/list/my-lists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao carregar listas");

      const data = await response.json();

      const shoppingItems = data.lists?.[0]?.items || [];

      set({ shoppingList: shoppingItems });
    } catch (error) {
      console.error("Erro ao carregar lista:", error);
      set({ shoppingList: [] });
    }
  },

   removeProductFromApi: async (productId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const listId = get().listId;
      if (!listId) throw new Error("listId não definido");

      const response = await fetch("https://shop-list-mzfv.onrender.com/list/remove-product", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listId,
          productsIds: [productId],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao remover produto");
      }

      // Após remover, atualize a lista local (carregue novamente)
      await get().loadShoppingList();
    } catch (error) {
      console.error("Erro ao remover produto da API:", error);
    }
  },

}));
