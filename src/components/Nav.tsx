import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";



export default function Nav() {
    const navigation = useNavigation();

    const handleCreate = () => {
        navigation.navigate("Categoria");
    };
    
    const handleTip = () => {
        navigation.navigate("Dicas");
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Ionicons name="home-outline" size={24} color="#6E3CBC" />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome name="user-o" size={24} color="#6E3CBC" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreate} >
                 <FontAwesome6 name="plus" size={24} color="#6E3CBC" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTip}>
                <FontAwesome name="gittip" size={24} color="#6E3CBC" />
            </TouchableOpacity>
            <TouchableOpacity>
                {/* <FontAwesome5 name="history" size={24} color="black" /> */}
                <MaterialIcons name="history" size={24} color="#6E3CBC" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
})