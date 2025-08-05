import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getFruits } from "../service/fruit.service";
import Card from "../components/Card";

import { searchFoods } from "../service/dados.service";
import { getBebidas } from "../service/bebida.service";
import { getCarnes } from "../service/carne.service";
import { getMassas, massas } from "../service/massa.service";
import { getDoces } from "../service/doce.service";
import { getLaticinios } from "../service/laticinios.service";
import { getLimpeza } from "../service/limpeza.service";
import { getCasa } from "../service/casa.service";
import { useShoppingListStore } from "../store/useShoppingListStore";
import colors from "../util/colors";
import { getCategories } from "../service/list.service";

const placeholderImage = "https://via.placeholder.com/150"; // URL da imagem de placeholder

interface Item {
    id: string;
    name: string;
    image: string;
}

interface Category {
    id: string;
    title: string;
    items: Item[];
}

const Categoria = () => {
    const addProductToList = useShoppingListStore((state) => state.addProductToList);
    const [categories] = useState([
        { id: "1", title: "Hortifruti", apiName: "fruits" },
        { id: "2", title: "Padaria", apiName: "padaria" },
        { id: "3", title: "Limpeza", apiName: "limpeza" },
        { id: "4", title: "Carne", apiName: "carne" },
        { id: "5", title: "Casa", apiName: "casa" },
        { id: "6", title: "Doce", apiName: "doce" },
        { id: "7", title: "Laticínios", apiName: "laticinio" },
        { id: "8", title: "Bebidas", apiName: "bebidas" },
        { id: "9", title: "Frutas", apiName: "fruits" },
        { id: "10", title: "Massas", apiName: "massa" },
        { id: "11", title: "Outros", apiName: "outros" },
    ]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("1");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchProducts(categories[0].apiName);
    }, []);

    // Função para buscar produtos da categoria
    const fetchProducts = async (categoryName) => {
        setLoading(true);
        try {
            const result = await getCategories(categoryName);
            console.log("✅ Produtos recebidos:", result);
            setProducts(result);
        } catch (error) {
            Alert.alert("Erro", error.message);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };



    const handleCategoryPress = (categoryId, categoryName) => {
        setSelectedCategory(categoryId);
        fetchProducts(categoryName);
    };




    return (
        <View style={styles.container}>
            {/* Menu de categorias */}
            <View style={styles.categoryContainer}>
                <ScrollView horizontal style={styles.list}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => handleCategoryPress(category.id, category.apiName)}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category.id && styles.selectedCategoryButton,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.textTitle,
                                    selectedCategory === category.id && styles.selectedCategoryTitle,
                                ]}
                            >
                                {category.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Lista de produtos */}
            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <Card
                            key={item.id}
                            id={item.id}
                            title={item.name}
                            image={item.image || placeholderImage}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    categoryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    listContainer: {
        justifyContent: "space-between",
        flexDirection: "column",
        paddingVertical: 10,
    },
    categoryButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
    },
    selectedCategoryButton: {
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
    },
    list: {
        gap: 5,
        flexDirection: "row",
    },
    textTitle: {
        color: colors.primary,
        fontSize: 20,
        marginHorizontal: 10,
    },
    selectedCategoryTitle: {
        color: colors.primary,
        fontWeight: "bold",
    },
});

export default Categoria;
