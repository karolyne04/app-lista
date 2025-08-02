import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function Historico() {
    const navigation = useNavigation();

    // Dados fictícios para simular histórico
    const [historico, setHistorico] = useState([
        { id: "1", nome: "Compras do mês", data: "28/07/2025", itens: 15 },
        { id: "2", nome: "Festa de aniversário", data: "15/07/2025", itens: 8 },
        { id: "3", nome: "Compras semanais", data: "05/07/2025", itens: 12 },
    ]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetalhesHistorico", { id: item.id })}
        >
            <View style={styles.info}>
                <Text style={styles.title}>{item.nome}</Text>
                <Text style={styles.subtitle}>{item.data} • {item.itens} itens</Text>
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
        padding: 16,
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
