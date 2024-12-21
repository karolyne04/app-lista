import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../util/colors";

interface CustomAlertProps {
    type: "success" | "error";
    message: string;
    onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ type, message, onClose }) => {
    const borderColor = type === "success" ? "#048C4A" : "#9B1438"; // Verde para sucesso e vermelho para erro
    const textColor = type === "success" ? "#4CAF50" : "#DA0037";

    return (
        <View style={[styles.alertContainer, { borderColor }]}>
            <Text style={[styles.alertText, ]}>{message}</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: borderColor }]} onPress={onClose}>
                <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomAlert;

const styles = StyleSheet.create({
    alertContainer: {
        width: "80%",
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        borderWidth: 1.5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "40%",
    },
    alertText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 16,
        color: colors.text
    },
    button: {
        width: 100,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
    },
});
