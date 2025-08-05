// src/screens/ShoppingList.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import colors from "../util/colors";
import { getShoppingList, removeProductsFromList } from "../service/shoppingList.service";
import AntDesign from '@expo/vector-icons/AntDesign';
export default function ShoppingList() {
  const [shoppingList, setShoppingList] = useState([]);
  const [listId, setListId] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const lists = await getShoppingList();
  //       console.log("✅ Listas carregadas do servidor:", JSON.stringify(lists, null, 2));

  //       if (lists.length > 0) {
  //         setListId(lists[0].id);

  //         // 🔹 Combina items com Product
  //         const combinedItems = lists[0].items.map(item => {
  //           const productInfo = lists[0].Product.find(p => p.id === item.idProduct) || {};
  //           return {
  //             ...item,
  //             name: productInfo.name || "Produto sem nome",
  //             image: productInfo.image || null,
  //           };
  //         });

  //         setShoppingList(combinedItems);
  //       }
  //     } catch (error) {
  //       console.log("Erro ao carregar lista:", error);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const lists = await getShoppingList();
        console.log("✅ Listas carregadas do servidor:", JSON.stringify(lists, null, 2));

        // Combina todos os itens de todas as listas
        const allItems = lists.flatMap(list =>
          list.items.map(item => {
            const productInfo = list.Product.find(p => p.id === item.idProduct) || {};
            return {
              idProduct: item.idProduct,
              quantity: item.quantity,
              name: productInfo.name || "Produto sem nome",
              image: productInfo.image || null,
            };
          })
        );

        // 🔹 Agrupar produtos iguais somando a quantidade
        const groupedItems = Object.values(
          allItems.reduce((acc, item) => {
            if (!acc[item.idProduct]) {
              acc[item.idProduct] = { ...item };
            } else {
              acc[item.idProduct].quantity += item.quantity;
            }
            return acc;
          }, {})
        );

        setShoppingList(groupedItems);
        setListId(lists[0]?.id || null);
      } catch (error) {
        console.log("Erro ao carregar lista:", error);
      }
    })();
  }, []);
  const handleRemoveItem = async (productId) => {
    try {
      if (!listId) {
        console.warn("ID da lista não encontrado");
        return;
      }

      await removeProductsFromList({ listId, productsIds: [productId] });

      // Atualiza a lista após remover
      const updatedLists = await getShoppingList();
      if (updatedLists.length > 0) {
        const combinedItems = updatedLists[0].items.map(item => {
          const productInfo = updatedLists[0].Product.find(p => p.id === item.idProduct) || {};
          return {
            ...item,
            name: productInfo.name || "Produto sem nome",
            image: productInfo.image || null,
          };
        });
        setShoppingList(combinedItems);
      } else {
        setShoppingList([]);
      }
    } catch (err) {
      console.log("Erro ao remover produto:", err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <Text style={styles.title}>
        {item.name} ({item.quantity}x)
      </Text>
      <TouchableOpacity onPress={() => handleRemoveItem(item.idProduct)}>

        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minha Lista de Compras</Text>
      <FlatList
        data={shoppingList}
        renderItem={renderItem}
        keyExtractor={(item) => item.idProduct}
        ListEmptyComponent={<Text>Lista vazia</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background || "#fff",
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
  placeholderImage: {
    width: 50,
    height: 50,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
});
