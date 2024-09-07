import {create} from "zustand";

export const useShoppingListStore = create((set) => ({
    shoppingList: [],
    addProductToList: (product) => set((state) => ({
        shoppingList: [...state.shoppingList, product],
    })),
    removeProductFromList: (title) => set((state) => ({
        shoppingList: state.shoppingList.filter((item) => item.title !== title),
    })),
}));
