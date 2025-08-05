import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../util/colors";

const InputField = ({
    iconName,
    placeholder,
    keyboardType = "default",
    secureTextEntry = false,
    value,
    onChangeText,
    autoCapitalize = "none",
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.cardInput, isFocused && styles.cardInputFocused]}>
            <MaterialCommunityIcons
                name={iconName}
                size={24}
                color={isFocused ? "#6E3CBC" : "#AEAEAE"}
            />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#AEAEAE"
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    cardInput: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#ccc",
        padding: 10,

        borderRadius: 50,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    cardInputFocused: {
        borderColor: colors.primary,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: "#333",
    },
});
