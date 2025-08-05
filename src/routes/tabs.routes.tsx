;
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Shooping from '../screens/Shooping';
import Categoria from '../screens/Categoria';
import Dicas from '../screens/Dicas';
import UserProfile from '../screens/UserProfile';
import Historico from '../screens/Historico';
import { Ionicons, FontAwesome, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#6E3CBC",
                tabBarInactiveTintColor: "#999",
            }}
        >
            <Tab.Screen
                name="Home"
                component={Shooping}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={UserProfile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user-o" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Categoria"
                component={Categoria}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="plus" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Dicas"
                component={Dicas}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="gittip" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Histórico"
                component={Historico}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="history" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
