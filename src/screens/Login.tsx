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


    const showCustomAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
    };
    const handleLogin = async () => {
        if (!email || !password) {
            showCustomAlert("error", "Preencha todos os campos");
            return;
        }

        setLoading(true);
        try {
            const result = await loginUser(email, password);

            if (result.access_token) {
                const token = result.access_token;

                // Decodifica payload do JWT
                const payload = JSON.parse(atob(token.split(".")[1]));

                // Salva no AsyncStorage
                await AsyncStorage.setItem("token", token);
                await AsyncStorage.setItem("userId", payload.id);

                console.log("✅ Login bem-sucedido, userId salvo:", payload.id);

                navigation.replace("Main");
            } else {
                showCustomAlert("error", "Token não recebido do servidor");
            }
        } catch (error: any) {
            showCustomAlert("error", error.message || "Erro desconhecido");
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
                    source={require("../../assets/logo.png")}
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
