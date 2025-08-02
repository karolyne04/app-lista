import React, { useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, Button } from "react-native";
import { useShoppingListStore } from "../store/useShoppingListStore";
import colors from "../util/colors";

export default function ShoppingList() {
  const shoppingList = useShoppingListStore((state) => state.shoppingList);
  const loadShoppingList = useShoppingListStore((state) => state.loadShoppingList);
  const removeProductFromList = useShoppingListStore((state) => state.removeProductFromList);

  // Carrega a lista de compras ao montar o componente
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    loadShoppingList();
  }, []);

  const handleRemoveItem = (title) => {
    removeProductFromList(title);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Button title="Remover" onPress={() => handleRemoveItem(item.title)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minha Lista de Compras</Text>
      <FlatList
        data={shoppingList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
});
