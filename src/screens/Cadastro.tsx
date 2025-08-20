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
import CustomAlert from "../components/CustomAlert";

export default function Cadastro() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);


    // const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState("");

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const showAlert = (type: "success" | "error", message: string, onClose?: () => void) => {
        setAlertType(type);
        setAlertMessage(message);
        setAlertVisible(true);

        // fecha sozinho em 3 segundos
        setTimeout(() => {
            setAlertVisible(false);
            if (onClose) onClose(); // chama função de callback após fechar
        }, 3000);
    };

    const handleRegister = async () => {

        if (!name || !email || !password) {
            showAlert("error", "Preencha todos os campos.");
            return;
        }

        setLoading(true);
        try {
            const result = await registerUser(name, email, password);

            showAlert("success", "Usuário registrado com sucesso!");
            navigation.navigate("Main");


        } catch (error) {
            showAlert("error", "Não foi possível realizar o cadastro.");
        } finally {

            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/logo.png")}
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
            {alertVisible && (
                <CustomAlert
                    type={alertType} // "success" ou "error"
                    message={alertMessage}
                    onClose={() => setAlertVisible(false)}
                />
            )}
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
