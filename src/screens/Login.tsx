import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Categoria from "./Categoria";
import CustomAlert from "../components/CustomAlert";
import { KeyboardAvoidingView, Platform } from 'react-native';
import colors from "../util/colors";

export default function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigation = useNavigation();
    const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);


    const handleLogin = () => {
        // if (email === "teste@example.com" && password === "123456") {
        //     setAlertType("success");
        //     setAlertMessage("Login realizado com sucesso!");
        navigation.navigate('Shooping');

        // } else {
        //     setAlertType("error");
        //     setAlertMessage("E-mail ou senha inválidos. Tente novamente.")
        // }
        // setShowAlert(true);
    };
    const handleCreate = () => {
        navigation.navigate('Cadastro');
    }

    return (
        <KeyboardAvoidingView
            style={styles.continer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >


            <View style={[styles.continer, { pointerEvents: 'box-none' }]}>
                <Image
                    source={require("../../assets/Preview.png")}
                    style={styles.logo}
                />
                {/* <Text style={styles.title}>Login</Text> */}
                <View style={[styles.cardInput, emailFocused && styles.cardInputFocused]}>
                    <MaterialCommunityIcons
                        name="email-outline"
                        size={24}
                        color={emailFocused ? "#6E3CBC" : "#AEAEAE"}
                    />
                    <TextInput
                        ref={emailRef}
                        style={styles.input}
                        placeholder="Email:"
                        keyboardType="email-address"
                        placeholderTextColor="#AEAEAE"
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}

                    />
                </View>

                <View style={[styles.cardInput, passwordFocused && styles.cardInputFocused]}>
                    <Ionicons
                        name="lock-closed-outline"
                        size={24}
                        color={passwordFocused ? "#6E3CBC" : "#AEAEAE"}
                    />
                    <TextInput
                        ref={passwordRef}
                        style={styles.input}
                        placeholder="Sua senha"
                        textContentType="password"

                        autoCapitalize="none"
                        placeholderTextColor="#AEAEAE"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!passwordVisible}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                    />

                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <Ionicons
                            name={passwordVisible ? "eye" : "eye-off"}
                            size={20}
                            color={passwordFocused ? "#6E3CBC" : "#AEAEAE"}
                        />
                    </TouchableOpacity>
                </View>
                {showAlert && <CustomAlert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} />}

                <Button title="Entrar" style={styles.button} onPress={handleLogin} />
                <Text style={styles.forgotPassword} onPress={handleCreate}>Criar conta</Text>

                <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
            </View>
        </KeyboardAvoidingView>
    )
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
    cardInputFocused: {
        borderColor: colors.primary,
    },
    button: {
        marginTop: 16
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
    },
    forgotPassword: {
        color: colors.primary,
        fontSize: 14,
        textDecorationLine: 'underline',
        marginTop: 16,
    },
})