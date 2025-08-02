import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import Button from "../components/Button";
import colors from "../util/colors";

export default function UserProfile() {
    const [name, setName] = useState("Carolyne Ferreira");
    const [email, setEmail] = useState("carol@example.com");
    const [phone, setPhone] = useState("(21) 99999-9999");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSave = () => {
        // lógica para salvar alterações
        console.log("Perfil atualizado");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: "https://i.pravatar.cc/150?img=3" }}
                style={styles.avatar}
            />

            <TouchableOpacity style={styles.changePhoto}>
                <Text style={styles.changePhotoText}>Alterar Foto</Text>
            </TouchableOpacity>

            {/* Nome */}
            <View style={styles.cardInput}>
                <Ionicons name="person-outline" size={22} color="#6E3CBC" />
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Email (somente leitura) */}
            <View style={styles.cardInput}>
                <MaterialCommunityIcons name="email-outline" size={22} color="#6E3CBC" />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    editable={false}
                />
            </View>

            {/* Telefone */}
            <View style={styles.cardInput}>
                <Ionicons name="call-outline" size={22} color="#6E3CBC" />
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            {/* Alterar Senha */}
            <View style={styles.cardInput}>
                <Ionicons name="lock-closed-outline" size={22} color="#6E3CBC" />
                <TextInput
                    style={styles.input}
                    placeholder="Nova senha"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={20} color="#6E3CBC" />
                </TouchableOpacity>
            </View>

            <Button title="Salvar Alterações" style={styles.button} onPress={handleSave} />

            <TouchableOpacity>
                <Text style={styles.logout}>Sair da Conta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: colors.background,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    changePhoto: {
        marginBottom: 20,
    },
    changePhotoText: {
        color: colors.primary,
        textDecorationLine: "underline",
    },
    cardInput: {
        width: 350,
        height: 50,
        borderWidth: 1.5,
        borderColor: colors.sec,
        borderRadius: 50,
        paddingHorizontal: 16,
        flexDirection: "row",
        marginTop: 16,
        alignItems: "center",
        backgroundColor: colors.background,
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    button: {
        marginTop: 24,
        width: 350,
    },
    logout: {
        color: "red",
        fontSize: 14,
        textDecorationLine: "underline",
        marginTop: 20,
    },
});
