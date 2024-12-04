import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "shopping-list-storage";

export const useShoppingListStore = create((set, get) => ({
  shoppingList: [],

  // Carrega a lista do AsyncStorage
  loadShoppingList: async () => {
    try {
      const storage = await AsyncStorage.getItem(STORAGE_KEY);
      const shoppingList = storage ? JSON.parse(storage) : [];
      set({ shoppingList });
    } catch (error) {
      console.error("Erro ao carregar a lista de compras:", error);
    }
  },

  // Adiciona ou atualiza um produto na lista
  addProductToList: async (product) => {
    const existingItem = get().shoppingList.find(item => item.id === product.id);

    if (existingItem) {
      // Se o item já estiver na lista, incrementa a quantidade
      existingItem.quantity += 1;
      set({ shoppingList: [...get().shoppingList] });
    } else {
      // Caso contrário, adiciona o item à lista
      const updatedList = [...get().shoppingList, product];
      set({ shoppingList: updatedList });
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(get().shoppingList));
    } catch (error) {
      console.error("Erro ao salvar o item:", error);
    }
  },

  // Remove um produto da lista
  removeProductFromList: async (id) => {
    const updatedList = get().shoppingList.filter((item) => item.id !== id);
    set({ shoppingList: updatedList });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
      console.error("Erro ao remover o item:", error);
    }
  },
}));
