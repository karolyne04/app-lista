import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useShoppingListStore } from "../store/useShoppingListStore";
import { addProductsToList } from "../service/shoppingList.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "./CustomAlert";

// base-64 decode (caso não esteja importado)
// import { decode as atob } from "base-64";

interface CardProps {
  id: string;
  title: string;
  image: string;
  category?: string;
}

export default function Card({ id, title, image, category }: CardProps) {
  const shoppingList = useShoppingListStore((state) => state.shoppingList);
  const addProductToList = useShoppingListStore((state) => state.addProductToList);
  const removeProductFromList = useShoppingListStore((state) => state.removeProductFromList);

  const itemInList = shoppingList.find((item) => item.id === id);
  const [alertData, setAlertData] = useState<{ type: "success" | "error"; message: string } | null>(null);


  useEffect(() => {
    if (alertData) {
      const timer = setTimeout(() => {
        setAlertData(null);
      }, 3000); // fecha após 3 segundos

      return () => clearTimeout(timer); // limpa o timer se o alerta mudar antes de 3s
    }
  }, [alertData]);
  const handleAddProduct = async () => {
    addProductToList({ id, title, image }); // Atualiza Zustand local

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      // Decodifica token para pegar userId (caso precise)
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded?.id;
      if (!userId) throw new Error("User ID não encontrado");

      const listId = await AsyncStorage.getItem("listId");
      const listName = await AsyncStorage.getItem("listName") || "Minha Lista de Compras";

      if (!listId) throw new Error("List ID não encontrado");

      // Agora enviamos o produto como array de objetos Product
      const response = await addProductsToList({
        listId,
        listName,
        userId,
        products: [{ id, name: title, image }], // formato correto da nova função
        defaultQuantity: 1,
      });


      setAlertData({ type: "success", message: `${title} adicionado à lista!` });
    } catch (error) {

      setAlertData({ type: "error", message: "Erro ao adicionar produto à lista." });
    }
  };


  const handleRemoveProduct = () => {
    removeProductFromList(id);
    setAlertData({ type: "success", message: `${title} removido da lista!` });
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
      {alertData && (
        <CustomAlert
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData(null)} // fecha ao clicar no botão
        />
      )}
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
