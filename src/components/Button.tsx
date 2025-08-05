import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import colors from "../util/colors";

type Props = {
    title: string;
    style?: ViewStyle | ViewStyle[];
    onPress?: () => void;
    disabled?: boolean;
};

export default function Button({ title, style, onPress, disabled = false }: Props) {
    return (
        <TouchableOpacity
            style={[styles.container, style, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, disabled && styles.textDisabled]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 50,
        padding: 15,
        justifyContent: "center",
        alignSelf: "center",
    },
    text: {
        color: colors.background,
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    disabled: {
        backgroundColor: "#bdbdbd",
    },
    textDisabled: {
        color: "#f0f0f0",
    },
});
