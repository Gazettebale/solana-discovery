import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SavedScreen from './src/screens/SavedScreen';
import QuestsScreen from './src/screens/QuestsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { AppProvider } from './src/context/AppContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#1a1a2e',
              borderTopColor: '#333',
              borderTopWidth: 1,
              paddingBottom: 12,
              paddingTop: 10,
              height: 72,
            },
            tabBarActiveTintColor: '#9945FF',
            tabBarInactiveTintColor: '#555',
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
              marginTop: 4,
            },
          }}
        >
          <Tab.Screen
            name="Discover"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>🧭</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Quests"
            component={QuestsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>⚔️</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Saved"
            component={SavedScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>🔖</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>👤</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
