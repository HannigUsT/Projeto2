import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MemoryGame from '../screens/MemoryGame';
import TicTacToe from '../screens/TicTacToe';

const Tab = createBottomTabNavigator();

export default function GameRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Jogo da Memoria"
        component={MemoryGame}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="brain" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Jogo da Velha"
        component={TicTacToe}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="square-off-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
