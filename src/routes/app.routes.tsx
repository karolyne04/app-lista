import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Shooping from '../screens/Shooping';
import Categoria from '../screens/Categoria';
import Product from '../screens/Product';
import Sop from '../screens/sop';

const {Navigator, Screen} = createStackNavigator();

export function AppRoutes() {
    return (
        <Navigator initialRouteName="Categories">
            <Screen name='Login' component={Login}/>
            <Screen name='Shooping' component={Shooping}/>
            <Screen name='Categoria' component={Categoria}/>
            <Screen name='Product' component={Product} />
            <Screen name='sop' component={Sop}/>
        </Navigator>
    )
}