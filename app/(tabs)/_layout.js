import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="home-outline" size={size} color={color} />;
          } else if (route.name === 'Bookmark') {
            return (
              <Image
                source={require('../../assets/images/iconbook.png')} 
                style={{ width: 20, height: 20, tintColor: color }}
              />
            );
          } else if (route.name === 'Profile') {
            return (
              <Image
                source={require('../../assets/images/profile.png')}
                style={{ width: 20, height: 20, tintColor: color }}
              />
            );
          }
        },
        tabBarActiveTintColor: '#4364F7',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    />
  );
}
