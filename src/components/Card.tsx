import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useShoppingListStore } from "../store/useShoppingListStore";

interface CardProps {
    title: string;
    image: string;
}
export default function Card({title, image}: CardProps) {
    const addProductToList = useShoppingListStore((state) => state.addProductToList);
    const removeProductFromList = useShoppingListStore((state) => state.removeProductFromList);

    const handleAddProduct = () => {
        addProductToList({ title, image });
    };

    const handleRemoveProduct = () => {
        removeProductFromList(title); // Vamos usar o `title` como identificador único
    };

    return (
        <View style={styles.card}>
             <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.textItem}>{title}</Text>

            <View style={styles.row}>   
                <TouchableOpacity onPress={handleAddProduct}>
                    <Entypo style={styles.text} name="plus" size={24} color="black" />
                </TouchableOpacity>
               
                <TouchableOpacity onPress={handleRemoveProduct}>
                    <FontAwesome6  style={styles.text} name="minus" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
		marginVertical: 10,
		marginHorizontal: 20,
		width: "100%",
		maxWidth: "90%",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap:  "wrap",
    },
    textItem: {
        fontSize: 16,
        marginBottom: 10,
        flexWrap:  "wrap",
    },
    image: {
        width: "20%",
        height: 50,
        borderRadius: 10,
    },
    row: {
        justifyContent: "space-between",
        gap: 3,
    },
    button: {
        width:30,
        height: 30,
        borderRadius: 100,
        backgroundColor: "#6E3CBC",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontWeight: "bold",
        color: "#6E3CBC",

    },
})