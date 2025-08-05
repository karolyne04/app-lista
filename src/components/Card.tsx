import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useShoppingListStore } from "../store/useShoppingListStore";
import { addProductsToList } from "../service/shoppingList.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CardProps {
  id: string;
  title: string;
  image: string;
}

export default function Card({ id, title, image }: CardProps) {
  const shoppingList = useShoppingListStore((state) => state.shoppingList);
  const addProductToList = useShoppingListStore((state) => state.addProductToList);
  const removeProductFromList = useShoppingListStore((state) => state.removeProductFromList);

  const itemInList = shoppingList.find((item) => item.id === id);

  const handleAddProduct = async () => {
    addProductToList({ id, title, image });

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded?.id;
      if (!userId) throw new Error("User ID não encontrado");

      let listId = await AsyncStorage.getItem("listId");

      const payload = {
        userId,
        items: [
          {
            idProduct: id.toString(),
            quantity: 1,
          },
        ],
      };

      // Se já existe lista criada, inclui o listId
      if (listId) {
        payload["listId"] = listId;
      }

      console.log("📤 Enviando itens da lista:", payload);

      const response = await addProductsToList(payload);

      // Se a API criar uma nova lista, salvar o listId retornado
      if (response?.listId) {
        await AsyncStorage.setItem("listId", response.listId);
      }

      console.log("✅ Produto adicionado no servidor");
    } catch (error) {
      console.log("❌ Erro ao salvar produto na API:", error);
      Alert.alert("Erro", "Não foi possível salvar no servidor");
    }
  };

  const handleRemoveProduct = () => {
    removeProductFromList(id);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.textItem}>{title}</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={handleAddProduct}>
          <Entypo style={styles.text} name="plus" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRemoveProduct}>
          <FontAwesome6 style={styles.text} name="minus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.quantity}>Q: {itemInList ? itemInList.quantity : 0}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  textItem: {
    fontSize: 16,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  row: {
    justifyContent: "space-between",
    gap: 10,
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
    color: "#6E3CBC",
  },
  quantity: {
    marginTop: 10,
    fontSize: 14,
    color: "#6E3CBC",
  },
  info: {
    gap: 3,
    flexDirection: "column",
    alignItems: "flex-start",
  },
});
