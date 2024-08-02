import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Categoria from "./Categoria";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('Categoria');
    };

    return (
        <View style={styles.continer}>
            <Image 
                source={require("../../assets/Preview.png")} 
                style={styles.logo}
            />
            <Text style={styles.title}>Login</Text>
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

            <Button title="Entrar" style={styles.button} onPress={handleLogin}/>

            <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap:5,
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
    button: {
        marginTop: 16
    },
    input: {
        flex: 1,
        height: 30,
        marginLeft: 10,
    },
    forgotPassword: {
        color: '#6E3CBC',
        fontSize: 14,
        textDecorationLine: 'underline',
        marginTop: 16,
    },
})