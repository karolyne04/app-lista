import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
    icon?: string

}

export default function Input( { icon }: Props) {
    return (
        <View style={styles.container} >
            {icon}
            <TextInput  {...res}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1.68,
        borderColor: "#ddd",
        width: 352,
        height: 50,
        borderRadius: 50,
    }
})