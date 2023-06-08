import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calculator from '../screens/Calculator';
import MemoryGame from '../screens/MemoryGame';
import TicTacToe from '../screens/TicTacToe';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Calculadora" component={Calculator} />
      <Tab.Screen name="Jogo da Memoria" component={MemoryGame} />
      <Tab.Screen name="Jogo da Velha" component={TicTacToe} />
    </Tab.Navigator>
  );
}
