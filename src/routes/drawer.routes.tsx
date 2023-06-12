import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Calculator from '../screens/Calculator';
import TabRoutes from './tab.routes';
import GameRoutes from './games.routes';
import Contacts from '../screens/Contacts';
import NotePad from '../screens/NotePad';
import Location from '../screens/Locations';
import Webview from '../screens/WebView';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator screenOptions={{ title: '' }}>
      <Drawer.Screen
        name="a"
        component={TabRoutes}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
          drawerLabel: 'Inicio',
        }}
      />
      <Drawer.Screen
        name="games"
        component={GameRoutes}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="game-controller-outline" size={size} color={color} />
          ),
          drawerLabel: 'Jogos',
        }}
      />
      <Drawer.Screen
        name="calc"
        component={Calculator}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="calculator" size={size} color={color} />
          ),
          drawerLabel: 'Calculadora',
        }}
      />
      <Drawer.Screen
        name="cont"
        component={Contacts}
        options={{
          drawerIcon: ({ color, size }) => <AntDesign name="contacts" size={size} color={color} />,
          drawerLabel: 'Contatos',
        }}
      />
      <Drawer.Screen
        name="notes"
        component={NotePad}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="sticker-text-outline" size={size} color={color} />
          ),
          drawerLabel: 'Bloco de Notas',
        }}
      />
      <Drawer.Screen
        name="locat"
        component={Location}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="map" size={size} color={color} />,
          drawerLabel: 'Mapa',
        }}
      />
      <Drawer.Screen
        name="web"
        component={Webview}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="web" size={size} color={color} />
          ),
          drawerLabel: 'Navegador',
        }}
      />
    </Drawer.Navigator>
  );
}
