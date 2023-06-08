import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Config from '../screens/Config';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Config} />
    </Stack.Navigator>
  );
}
