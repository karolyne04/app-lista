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
import RecoverPassword from '../screens/RecoverPassword';
import UserProfile from '../screens/UserProfile';
import Historico from '../screens/Historico';
import ResetPassword from '../screens/ResetPassword';
import { TabRoutes } from './tabs.routes';
import { CreateList } from '../screens/CreateList';
import DetalhesHistorico from '../screens/DetalhesHistorico';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
    return (
        <Navigator initialRouteName="Categories">
            <Screen name='Login' component={Login} options={{ headerShown: false }} />

            <Screen
                name="Main"
                component={TabRoutes}
                options={{ headerShown: false }}
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
            <Screen name='DetalhesHistorico' component={DetalhesHistorico} options={{
                title: "Detalhes do Histórico",
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
            }} />

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

            <Screen name="RecoverPassword" component={RecoverPassword}
                options={{
                    title: "Recuperar Senha",
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
            <Screen name='CreateList' component={CreateList}
                options={{
                    title: "Criar Lista",
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

            <Screen name="ResetPassword" component={ResetPassword}
                options={{
                    title: "Redefinir Senha",
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