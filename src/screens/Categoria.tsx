import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("1");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Inicializa as categorias sem itens
                const initialCategories: Category[] = [
                    { id: '1', title: 'Todos', items: [] },
                    { id: '2', title: 'Fruta', items: await getFruits() },
                    { id: '3', title: 'Bebidas', items: await getBebidas() },
                    { id: '4', title: 'Carne', items: await getCarnes() },
                    { id: '5', title: 'Massa', items: await getMassas() },
                    { id: '6', title: 'Doce', items: await getDoces() },
                    { id: '7', title: 'Laticínios', items: await getLaticinios()},
                    { id: '8', title: 'Limpeza', items: await getLimpeza() },
                    { id: '9', title: 'Casa', items: await getCasa() },
                ];

                setCategories(initialCategories);
            } catch (error) {
                console.error("Erro ao buscar item", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategoryPress = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    

    const renderCategoryItems = () => {
        const category = categories.find((cat) => cat.id === selectedCategory);
        if (!category) return null;
        return (
            <FlatList
                data={category.items}
                renderItem={({ item }) => (
                    <Card 
                        key={item.id} 
                        title={item.name} 
                        image={item.image || placeholderImage}
                     />
                    )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.categoryContainer}>
                <ScrollView horizontal style={styles.list}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => handleCategoryPress(category.id)}
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

            {loading ? <Text>Loading...</Text> : renderCategoryItems()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderBottomColor: "#6E3CBC",
    },
    list: {
        gap: 5,
        flexDirection: "row",
    },
    textTitle: {
        color: "#6E3CBC",
        fontSize: 20,
        marginHorizontal: 10,
    },
    selectedCategoryTitle: {
        color: "#6E3CBC",
        fontWeight: "bold",
    },
});

export default Categoria;
