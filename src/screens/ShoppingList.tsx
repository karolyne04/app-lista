// src/screens/ShoppingList.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import colors from "../util/colors";
import { getShoppingList, removeProductsFromList } from "../service/shoppingList.service";
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomAlert from "../components/CustomAlert";
export default function ShoppingList() {
  const [shoppingList, setShoppingList] = useState([]);
  const [listId, setListId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");
  const showCustomAlert = (type: "success" | "error", message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const lists = await getShoppingList();
        console.log("✅ Listas carregadas do servidor:", JSON.stringify(lists, null, 2));
        if (!lists || lists.length === 0) {
          setShoppingList([]);
          setListId(null);
          showCustomAlert("error", "Nenhuma lista encontrada.");
          return;
        }
        // Pega a primeira lista ou ajusta conforme sua regra
        const firstList = lists[0];
        setListId(firstList.id || firstList.listId || null);

        const allItems = (firstList.items || []).map(item => {
          // Evita erro se Product não existir
          const productInfo = (firstList.Product || []).find(p => p.id === item.idProduct) || {};
          return {
            idProduct: item.idProduct,
            quantity: item.quantity || 1,
            name: productInfo.name || "Produto sem nome",
            image: productInfo.image || null,
          };
        });
        setShoppingList(allItems);
      } catch (error) {
        showCustomAlert("error", "Erro ao carregar lista.");
        setShoppingList([]);
        setListId(null);
      }
    })();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      if (!listId) {
        showCustomAlert("error", "ID da lista não encontrado");
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
      showCustomAlert("error", "Erro ao remover produto");
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
      {showAlert && (
        <CustomAlert
          type={alertType}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
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
