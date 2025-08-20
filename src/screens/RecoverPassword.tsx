import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import colors from "../util/colors";
import InputField from "../components/InputField";
import { forgotPassword, resetPassword } from "../service/auth.service";
import CustomAlert from "../components/CustomAlert";

export default function RecoverPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");

    const navigation = useNavigation();

    const handleRecover = async () => {
        console.log("📌 Iniciando recuperação de senha...");
        console.log("Dados do formulário:", { email });

        setLoading(true);
        try {
            const result = await forgotPassword(email);


            console.log("✅ Solicitação enviada:", result);


            setAlertType("success");
            setAlertMessage("Se o e-mail estiver cadastrado, as instruções foram enviadas.");
            setAlertVisible(true);
            navigation.navigate("ResetPassword");
        } catch (error) {
            console.log("❌ Erro ao solicitar recuperação:", error);

            setAlertType("error");
            setAlertMessage(error.message || "Ocorreu um erro inesperado");
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Image
                source={require("../../assets/logo.png")}
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={styles.subtitle}>
                Digite o e-mail cadastrado para receber as instruções de redefinição.
            </Text>

            <InputField
                iconName="email"
                placeholder="Seu e-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <Button title="Enviar instruções" style={styles.button} onPress={handleRecover} disabled={loading} />

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.backLogin}>Voltar para Login</Text>
            </TouchableOpacity>
            {alertVisible && (
                <CustomAlert
                    type={alertType}
                    message={alertMessage}
                    onClose={() => {
                        setAlertVisible(false);
                        if (alertType === "success") {
                            navigation.navigate("ResetPassword");
                        }
                    }}
                />
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 10,
    },
    image: {
        width: 150,
        height: 150,

    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        color: "#666",
        marginBottom: 20,
        paddingHorizontal: 20,
    },


    button: {
        marginTop: 20,
    },
    backLogin: {
        color: colors.primary,
        fontSize: 14,
        textDecorationLine: "underline",
        marginTop: 16,
    },
});
