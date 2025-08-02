import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import colors from "../util/colors";

export default function RecoverPassword() {
    const emailRef = useRef(null);
    const [email, setEmail] = useState("");
    const [emailFocused, setEmailFocused] = useState(false);
    const navigation = useNavigation();

    const handleRecover = () => {
        // Aqui você chamaria a API de recuperação de senha
        console.log("E-mail enviado para redefinição:", email);
        navigation.navigate("Login");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Text style={styles.title}>Recuperar Senha</Text>
            <Text style={styles.subtitle}>
                Digite o e-mail cadastrado para receber as instruções de redefinição.
            </Text>

            <View style={[styles.cardInput, emailFocused && styles.cardInputFocused]}>
                <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color={emailFocused ? "#6E3CBC" : "#AEAEAE"}
                />
                <TextInput
                    ref={emailRef}
                    style={styles.input}
                    placeholder="Seu e-mail"
                    keyboardType="email-address"
                    placeholderTextColor="#AEAEAE"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    value={email}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                />
            </View>

            <Button title="Enviar instruções" style={styles.button} onPress={handleRecover} />

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.backLogin}>Voltar para Login</Text>
            </TouchableOpacity>
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
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        color: "#666",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    cardInput: {
        width: 352,
        height: 50,
        borderWidth: 1.5,
        borderColor: "#AEAEAE",
        borderRadius: 50,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginTop: 16,
    },
    cardInputFocused: {
        borderColor: colors.primary,
    },
    input: {
        flex: 1,
        marginLeft: 10,
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
