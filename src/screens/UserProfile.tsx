import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import colors from "../util/colors";
import { getUserInfo, updateUserInfo } from "../service/auth.service"; // updateUserInfo a gente cria
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/CustomAlert";

export default function UserProfile() {
    const [userData, setUserData] = useState<any>(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState("");

    const showCustomAlert = (type: "success" | "error", message: string) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
    };


    useEffect(() => {
        let isMounted = true;
        async function fetchUserData() {
            try {
                setLoading(true);
                const data = await getUserInfo();
                if (isMounted) {
                    setUserData(data);
                    setName(data.name); // inicializa o estado local do nome
                }
            } catch (error) {
                console.error("Erro ao carregar dados do usuário", error);
                navigation.replace("Login"); // se token inválido, volta pro login
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchUserData();
        return () => { isMounted = false };
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color={colors.primary} />;
    }

    const handleSave = async () => {
        if (!name.trim()) {
            showCustomAlert("error", "O nome não pode estar vazio");
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('Usuário não autenticado');

            const updatedUser = await updateUserInfo(token, { name });
            setUserData(updatedUser);

            showCustomAlert("success", "Perfil atualizado com sucesso!");
        } catch (error: any) {
            showCustomAlert("error", error.message || "Erro ao atualizar perfil");
        } finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return <ActivityIndicator size="large" color={colors.primary} />;
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            showCustomAlert("success", "Logout realizado com sucesso!");
            navigation.replace("Login");
        } catch (error) {
            console.error("Erro ao sair da conta:", error);
            showCustomAlert("error", "Não foi possível sair da conta");
        }
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Nome */}
            <View style={styles.cardInput}>
                <Ionicons name="person-outline" size={22} color="#6E3CBC" />
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Email (somente leitura) */}
            <View style={styles.cardInput}>
                <MaterialCommunityIcons name="email-outline" size={22} color="#6E3CBC" />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={userData.email}
                    editable={false}
                />
            </View>

            {/* Alterar Senha */}
            <View style={styles.cardInput}>
                <Ionicons name="lock-closed-outline" size={22} color="#6E3CBC" />
                <TextInput
                    style={styles.input}
                    placeholder="Nova senha"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={20} color="#6E3CBC" />
                </TouchableOpacity>
            </View>

            <Button title={loading ? "Salvando..." : "Salvar Alterações"} style={styles.button} onPress={handleSave} disabled={loading} />

            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logout}>Sair da Conta</Text>
            </TouchableOpacity>
            {showAlert && (
                <CustomAlert
                    type={alertType}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: colors.background,
    },
    cardInput: {
        width: 350,
        height: 50,
        borderWidth: 1.5,
        borderColor: colors.sec,
        borderRadius: 50,
        paddingHorizontal: 16,
        flexDirection: "row",
        marginTop: 16,
        alignItems: "center",
        backgroundColor: colors.background,
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    button: {
        marginTop: 24,
        width: 350,
    },
    logout: {
        color: "red",
        fontSize: 14,
        textDecorationLine: "underline",
        marginTop: 20,
    },
});
