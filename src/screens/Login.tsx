import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import Button from "../components/Button";

import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomAlert from "../components/CustomAlert";
import { KeyboardAvoidingView, Platform } from "react-native";
import colors from "../util/colors";
import PasswordInput from "../components/PasswordInput";
import InputField from "../components/InputField";
import { loginUser } from "../service/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();
    const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        console.log("📌 Iniciando login...");
        console.log("Dados do formulário:", { email, password });

        if (!email || !password) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        setLoading(true);
        try {
            const result = await loginUser(email, password);
            console.log("✅ Login bem-sucedido:", result);

            // ✅ Salvar token
            if (result.access_token) {
                await AsyncStorage.setItem("token", result.access_token);
                console.log("🔑 Token salvo com sucesso:", result.access_token);

                // ✅ Decodificar token para pegar o userId
                const base64Url = result.access_token.split('.')[1];
                const decodedPayload = JSON.parse(atob(base64Url));

                if (decodedPayload?.id) {
                    await AsyncStorage.setItem("userId", decodedPayload.id);
                    console.log("👤 UserID salvo:", decodedPayload.id);
                } else {
                    console.log("⚠️ Nenhum userId encontrado no token.");
                }
            } else {
                console.log("⚠️ Nenhum token recebido da API");
            }

            // 🔎 Confirmar armazenamento
            const savedToken = await AsyncStorage.getItem("token");
            const savedUserId = await AsyncStorage.getItem("userId");
            console.log("🔎 Token armazenado:", savedToken);
            console.log("🔎 UserID armazenado:", savedUserId);

            // ✅ Navegar para a tela principal
            // navigation.navigate("Shooping");
            navigation.replace("Main");


        } catch (error: any) {
            console.log("❌ Erro ao fazer login:", error);

            const msg = error.response?.data?.message
                || error.message
                || "Erro desconhecido. Tente novamente.";
            Alert.alert("Erro", msg);
        } finally {
            setLoading(false);
        }
    };
    const handleCreate = () => {
        navigation.navigate("Cadastro");
    };

    return (
        <KeyboardAvoidingView
            style={styles.continer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={[styles.continer, { pointerEvents: "box-none" }]}>
                <Image
                    source={require("../../assets/Preview.png")}
                    style={styles.logo}
                />
                <InputField
                    iconName="email-outline"
                    placeholder="Seu e-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <PasswordInput
                    placeholder="Sua senha"
                    value={password}
                    onChangeText={setPassword}
                />
                {showAlert && (
                    <CustomAlert
                        type={alertType}
                        message={alertMessage}
                        onClose={() => setShowAlert(false)}
                    />
                )}

                <Button title={loading ? "Entrando..." : "Entrar"} style={styles.button} onPress={handleLogin} disabled={loading} />
                <Text style={styles.forgotPassword} onPress={handleCreate}>
                    Criar conta
                </Text>

                <Text
                    style={styles.forgotPassword}
                    onPress={() => navigation.navigate("RecoverPassword")}
                >
                    Esqueceu sua senha?
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        padding: 16,
        backgroundColor: colors.background,
    },
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 24,
    },
    cardInput: {
        width: 352,
        height: 50,
        borderWidth: 1.67,
        borderColor: colors.sec,
        borderRadius: 50,
        paddingHorizontal: 16,
        flexDirection: "row",
        marginTop: 16,
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    },

    button: {
        marginTop: 16,
    },
    forgotPassword: {
        color: colors.primary,
        fontSize: 14,
        textDecorationLine: "underline",
        marginTop: 16,
    },
});
