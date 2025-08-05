import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../util/colors";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import { registerUser } from "../service/auth.service";

export default function Cadastro() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);



    const handleRegister = async () => {
        console.log("📌 Iniciando registro...");
        console.log("Dados do formulário:", { name, email, password });

        if (!name || !email || !password) {
            Alert.alert("Erro", "Preencha todos os campos");
            console.log("⚠️ Campos obrigatórios faltando!");
            return;
        }

        setLoading(true);
        try {
            const result = await registerUser(name, email, password);
            console.log("✅ Registro bem-sucedido:", result);

            Alert.alert("Sucesso", "Usuário registrado com sucesso!");
            navigation.navigate("Shooping");
        } catch (error) {
            console.log("❌ Erro ao registrar usuário:", error);
            Alert.alert("Erro", error.message);
        } finally {
            console.log("🔄 Finalizando processo de registro...");
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/Preview.png")}
                style={styles.logo}
            />



            <InputField
                iconName="account-outline"
                placeholder="Seu e-mail"
                keyboardType="email-address"
                value={name}
                onChangeText={setName}
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


            <Button title="Cadastrar" style={styles.button} onPress={handleRegister} disabled={loading} />

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
        </View>
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
    cardInputFocused: {
        borderColor: colors.primary,
    },
    input: {
        flex: 1,
        height: 30,
        marginLeft: 10,
    },
    button: {
        marginTop: 16
    },
    loginLink: {
        color: colors.primary,
        fontSize: 14,
        textDecorationLine: 'underline',
        marginTop: 16,
    },
});
