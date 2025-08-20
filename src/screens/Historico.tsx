import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useShoppingListStore } from "../store/useShoppingListStore";
import { getShoppingList } from "../service/shoppingList.service";

export default function Historico() {
    const navigation = useNavigation();
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const lists = await getShoppingList();
                const mapped = lists.map((list) => ({
                    id: list.id || list.listId,
                    nome: list.name || "Sem nome",  // 👈 pega o campo name do backend
                    data: list.createdAt
                        ? new Date(list.createdAt).toLocaleDateString("pt-BR")
                        : "01/01/2025",
                    itens: list.items?.length || 0,
                    items: list.items || [],
                }));
                setHistorico(mapped);
            } catch (error) {
                console.log("Erro ao carregar histórico:", error);
            }
        })();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetalhesHistorico", { lista: item })}
        >
            <View style={styles.info}>
                <Text style={styles.title}>{item.nome}</Text>
                <Text style={styles.subtitle}>{item.data} • {item.itens} itens</Text>
                <Text style={styles.productsPreview}>
                    {item.items.slice(0, 3).map(p => p.title).join(", ")}
                    {item.items.length > 3 ? ", ..." : ""}
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6E3CBC" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Histórico de Compras</Text>

            {historico.length > 0 ? (
                <FlatList
                    data={historico}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={styles.emptyText}>Nenhum histórico encontrado.</Text>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#6E3CBC",
        marginBottom: 16,
        textAlign: "center",
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: "#AEAEAE",
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
    },
    info: {
        flexDirection: "column",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    emptyText: {
        textAlign: "center",
        color: "#999",
        marginTop: 20,
        fontSize: 16,
    },
});
