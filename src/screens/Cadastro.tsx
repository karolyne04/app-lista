import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Cadastro() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigation = useNavigation();

    const handleSignUp = () => {
       navigation.navigate("Shooping");
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require("../../assets/Preview.png")} 
                style={styles.logo}
            />
           
            
            <View style={[styles.cardInput, nameFocused && styles.cardInputFocused]}>
                <MaterialCommunityIcons
                    name="account-outline"
                    size={24}
                    color={nameFocused ? "#6E3CBC" : "#AEAEAE"}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Nome Completo:"
                    placeholderTextColor="#AEAEAE"
                    onChangeText={setName}
                    value={name}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                />
            </View>

            <View style={[styles.cardInput, emailFocused && styles.cardInputFocused]}>
                <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color={emailFocused ? "#6E3CBC" : "#AEAEAE"}
                />
                <TextInput 
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
                    style={styles.input}
                    placeholder="Sua senha"
                    placeholderTextColor="#AEAEAE"
                    autoCapitalize="none"
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


            <Button title="Cadastrar" style={styles.button} onPress={handleSignUp}/>
            
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
        backgroundColor: "#fff"
    },
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#6E3CBC",
        marginBottom: 24,
    },
    cardInput: {
        width: 352,
        height: 50,
        borderWidth: 1.67,
        borderColor: "#AEAEAE",
        borderRadius: 50,
        paddingHorizontal: 16,
        flexDirection: "row",
        marginTop: 16,
        alignSelf: "center",
        alignItems: "center", 
        backgroundColor: "#fff",
    },
    cardInputFocused: {
        borderColor: "#6E3CBC",
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
        color: '#6E3CBC',
        fontSize: 14,
        textDecorationLine: 'underline',
        marginTop: 16,
    },
});
