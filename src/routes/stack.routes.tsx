import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotePad from '../screens/NotePad';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Index" component={NotePad} />
    </Stack.Navigator>
  );
}
