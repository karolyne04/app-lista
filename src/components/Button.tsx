import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import colors from "../util/colors";
type Pros = {
    title: string;
    style?: ViewStyle | ViewStyle[];
    onPress?: () => void;
}
export default function Button({ title, style, onPress }: Pros) {
    return (

        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
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
        color: colors.text,
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center",
    }
})