import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Nav() {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Ionicons name="home-outline" size={24} color="#6E3CBC" />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome name="user-o" size={24} color="#6E3CBC" />
            </TouchableOpacity>
            <TouchableOpacity>
                 <FontAwesome6 name="plus" size={24} color="#6E3CBC" />
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