import { useState } from "react";
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import colors from "../util/colors";
import { resetPassword } from "../service/auth.service";

export default function ResetPassword() {
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [email, setEmail] = useState("");


    const handleResetPassword = async () => {
        if (!token || !newPassword || !confirmPassword) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }

        setLoading(true);
        try {

            const result = await resetPassword(email, newPassword, token);

            console.log("✅ Senha redefinida com sucesso:", result);
            Alert.alert("Sucesso", "Senha redefinida com sucesso!");
            navigation.navigate("Login");
        } catch (error) {
            console.log("❌ Erro ao redefinir senha:", error);
            Alert.alert("Erro", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Text style={styles.title}>Redefinir Senha</Text>
            <Text style={styles.subtitle}>
                Cole abaixo o token recebido no e-mail e digite sua nova senha.
            </Text>

            <InputField
                iconName="key-outline"
                placeholder="Token recebido"
                value={token}
                onChangeText={setToken}
            />

            <PasswordInput
                placeholder="Nova senha"
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <InputField
                iconName="mail"
                placeholder="Seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />


            <PasswordInput
                placeholder="Confirmar nova senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <Button
                title={loading ? "Redefinindo..." : "Redefinir Senha"}
                style={styles.button}
                onPress={handleResetPassword}
                disabled={loading}
            />
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
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
        color: colors.primary,
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
});
