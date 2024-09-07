import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Shooping from '../screens/Shooping';
import Categoria from '../screens/Categoria';
import Product from '../screens/Product';
import Sop from '../screens/sop';
import Cadastro from '../screens/Cadastro';
import ShoppingList from '../screens/ShoppingList';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from 'react-native';
import Dicas from '../screens/Dicas';

const {Navigator, Screen} = createStackNavigator();

export function AppRoutes() {
    return (
        <Navigator initialRouteName="Categories">
            <Screen name='Login' component={Login} options={{ headerShown: false }}/>
            <Screen name='Shooping' component={Shooping} 
            options={{
                title: "Home",
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <Ionicons
                            name="chevron-back"
                            size={24}
							color="#6E3CBC"
							style={styles.icon}
                    />
                )
            }}
            />
            <Screen name='Categoria' component={Categoria}
                options={{
                    title: "Categoria",
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <Ionicons
                            name="chevron-back"
                            size={24}
							color="#6E3CBC"
							style={styles.icon}
                        />
                    )
                }}
            />
            <Screen name='Product' component={Product} />
            <Screen name='sop' component={Sop}/>
            <Screen name='Cadastro' component={Cadastro} 
                options={{
                    title: "Criar Usuario",
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <Ionicons
                            name="chevron-back"
                            size={24}
							color="#6E3CBC"
							style={styles.icon}
                        />
                    )
                }}
            />
            <Screen name='ShoppingList' component={ShoppingList}
                options={{
                    title: "Lista",
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <Ionicons
                            name="chevron-back"
                            size={24}
							color="#6E3CBC"
							style={styles.icon}
                        />
                    )
                }}
            />
            <Screen name="Dicas" component={Dicas} 
                options={{
                    title: "Dicas",
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <Ionicons
                            name="chevron-back"
                            size={24}
							color="#6E3CBC"
							style={styles.icon}
                        />
                    )
                }}
            />
        </Navigator>
    )
}

const styles = StyleSheet.create({
	icon: {
		marginLeft: 10,
	},
})