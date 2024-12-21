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
    const shoppingList = get().shoppingList.map(item => 
      item.id === product.id
      ? {...item, quantity: item.quantity + 1}
      : item
    );

    const itemExists = shoppingList.some(item => item.id === product.id);
    if (!itemExists) {
      shoppingList.push({...product, quantity: 1});

    }

    set({shoppingList});

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(shoppingList));
    } catch (error) {
      console.error("Erro ao salvar o item:", er);
      
    }
    // const itemIndex = shoppingList.findIndex(item => item.id === product.id);

    // if (itemIndex >= 0) {
    //   shoppingList[itemIndex] = {
    //     ...shoppingList[itemIndex],
    //     quantity: shoppingList[itemIndex].quantity + 1,
    //   }
    // } else {
    //   shoppingList.push({...product, quantity: 1});
    // }
    // const existingItem = get().shoppingList.find(item => item.id === product.id);
  },

  // Remove um produto da lista
  removeProductFromList: async (id) => {
    let shoppingList = [...get().shoppingList];
    const  itemIndex = shoppingList.findIndex(item => item.id === id);

    if (itemIndex >= 0) {
      const item = shoppingList[itemIndex];
      if (item.quantity > 1) {
        shoppingList[itemIndex] = {...item, quantity: item.quantity - 1};
      } else {
        shoppingList =  shoppingList.filter(item => item.id !== id);
      }
    }
    set({shoppingList});

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(shoppingList));
    } catch (error) {
      console.error("Erro ao remover o item:", error);
    }
  },
}));
