import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasswordInput = ({
    placeholder = "Sua senha",
    value,
    onChangeText,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={[styles.cardInput, isFocused && styles.cardInputFocused]}>
            <Ionicons
                name="lock-closed-outline"
                size={24}
                color={isFocused ? "#6E3CBC" : "#AEAEAE"}
            />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#AEAEAE"
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Ionicons
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={20}
                    color={isFocused ? "#6E3CBC" : "#AEAEAE"}
                />
            </TouchableOpacity>
        </View>
    );
};

export default PasswordInput;

const styles = StyleSheet.create({
    cardInput: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 50,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    cardInputFocused: {
        borderColor: "#6E3CBC",
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: "#333",
    },
});
