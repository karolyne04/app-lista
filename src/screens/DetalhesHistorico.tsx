import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { getProductById } from "../service/shoppingList.service";
import CustomAlert from "../components/CustomAlert";

const DetalhesHistorico = () => {
    const route = useRoute();
    const { lista } = route.params;
    console.log("📌 Dados recebidos em DetalhesHistorico:", lista);

    const [produtos, setProdutos] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState("");


    const showCustomAlert = (type: "success" | "error", message: string) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
    };

    useEffect(() => {
        const fetchProdutos = async () => {
            try {

                if (!lista?.items || lista.items.length === 0) {
                    showCustomAlert("error", "Nenhum item encontrado nesta lista.");
                    return;
                }
                // Usa sua função getProductById
                const promises = lista.items.map(async (item) => {
                    const data = await getProductById(item.idProduct);
                    return {
                        ...data,
                        quantity: item.quantity,
                    };
                });

                const results = await Promise.all(promises);
                setProdutos(results);

            } catch (err) {

                showCustomAlert("error", "Não foi possível carregar os produtos.");
            }
        };

        fetchProdutos();
    }, [lista]);

    if (!lista) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Nenhuma lista encontrada</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{lista.name}</Text>
            <Text style={styles.subtitle}>
                Criada em {lista.data} • {lista.itens} itens
            </Text>

            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.itemImage}
                            resizeMode="contain"
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.quantity}>Qtd: {item.quantity}</Text>
                        </View>
                    </View>
                )}
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
};

export default DetalhesHistorico;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#6E3CBC",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 16,
        textAlign: "center",
    },
    itemCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#f9f9f9",
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: "#eee",
    },
    itemText: { fontSize: 16, color: "#333", fontWeight: "600" },
    quantity: { fontSize: 14, color: "#555" },
});
