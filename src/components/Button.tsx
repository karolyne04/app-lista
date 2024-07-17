import { StyleSheet, Text, TouchableOpacity } from "react-native";
type Pros = {
    title: string
    style?: string
}
export default function Button({title, style}: Pros) {
    return (

        <TouchableOpacity  style={[styles.container, style]}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 50,
        backgroundColor:"#6E3CBC",
        borderRadius: 50,
        padding: 15,
        justifyContent: "center",
        alignSelf: "center",
    },
    text: {
        color: "#fff",
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center",
    }
})