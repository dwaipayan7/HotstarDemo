import { COLORS } from '@/constants/colors';
import useTheme from '@/hooks/useTheme';
import HomeScreen from '@/screens/home/HomeScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import SearchScreen from '@/screens/search/SearchScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  HomeDetails: { id: string };
  SplashScreen: undefined;
};


export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};


const BottomTab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {

  const { isDark, theme, toggle } = useTheme();


  const insets = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.tabActiveColor,
        tabBarInactiveTintColor: COLORS.tabInactiveColor,
        tabBarStyle: {
          backgroundColor: isDark ? COLORS.backgroundColor : COLORS.divider,
          height: 50 + insets.bottom,
          paddingTop: 8,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
