import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator, { RootStackParamList } from './MainTabNavigator';
import SplashScreen from '@/screens/SplashScreen';
import HomeDetailsScreen from '@/screens/home/HomeDetailsScreen';


const Stack = createStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="HomeDetails" component={HomeDetailsScreen} />
    </Stack.Navigator>
  );
}
