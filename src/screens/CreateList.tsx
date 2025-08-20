import { useState } from "react";
import { Text, View, Alert } from "react-native";
import InputField from "../components/InputField";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createList } from "../service/shoppingList.service";
import CustomAlert from "../components/CustomAlert";

export const CreateList = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");

    const navigation = useNavigation();

    const showAlert = (type: "success" | "error", message: string) => {
        setAlertType(type);
        setAlertMessage(message);
        setAlertVisible(true);
    };
    const handleSave = async () => {
        if (!name.trim()) {
            showAlert("error", "Digite um nome para a lista");
            return;
        }

        try {
            setLoading(true);
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) throw new Error("User ID não encontrado");

            // Cria a lista com createList
            const novaLista = await createList({ userId, name, items: [] });

            const listId = novaLista?.listId || novaLista?.id;
            const listName = novaLista?.name || name;

            // Salva no AsyncStorage para usar depois no Card
            await AsyncStorage.setItem("listId", listId);
            await AsyncStorage.setItem("listName", listName);


            showAlert("success", "Lista criada com sucesso!");

            // Navega para a tela de categorias passando o listId
            navigation.navigate("Categoria", { listId });
        } catch (error) {
            showAlert("error", "Não foi possível criar a lista");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Criar Nova Lista</Text>
            <InputField
                icon="account"
                label="Nome da Lista"
                value={name}
                onChangeText={setName}
                placeholder="Nome da lista"
            />
            <Button title={loading ? "Criando..." : "Criar"} onPress={handleSave} disabled={loading} />

            {alertVisible && (
                <CustomAlert
                    type={alertType}
                    message={alertMessage}
                    onClose={() => setAlertVisible(false)}
                />
            )}
        </View>
    );
};
