import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useShoppingListStore } from "../store/useShoppingListStore";

interface CardProps {
  id: string;
  title: string;
  image: string;
}

export default function Card({ id, title, image }: CardProps) {
  const shoppingList = useShoppingListStore((state) => state.shoppingList);
  const addProductToList = useShoppingListStore((state) => state.addProductToList);
  const removeProductFromList = useShoppingListStore((state) => state.removeProductFromList);

  const itemInList = shoppingList.find(item => item.id === id);

  const handleAddProduct = () => {
    addProductToList({
      id,
      title,
      image,
      quantity: (itemInList ? itemInList.quantity : 0) + 1, // Incrementa a quantidade no item clicado
    });
  };

  const handleRemoveProduct = () => {
    if (itemInList && itemInList.quantity > 1) {
      addProductToList({
        id,
        title,
        image,
        quantity: itemInList.quantity - 1, // Decrementa a quantidade no item clicado
      });
    } else if (itemInList) {
      removeProductFromList(id); // Remove o item caso a quantidade chegue a 1
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.textItem}>{title}</Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={handleAddProduct}>
          <Entypo style={styles.text} name="plus" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.quantity}>
          {itemInList ? itemInList.quantity : 0}
        </Text>

        <TouchableOpacity onPress={handleRemoveProduct}>
          <FontAwesome6 style={styles.text} name="minus" size={24} color="black" />
        </TouchableOpacity>
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
});
