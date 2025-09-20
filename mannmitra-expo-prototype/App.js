import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import MoodScreen from './src/screens/MoodScreen';
import JournalScreen from './src/screens/JournalScreen';
import { ensureAnonymousAuth } from './src/firebase/init';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => { ensureAnonymousAuth(); }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Mood" component={MoodScreen} />
          <Stack.Screen name="Journal" component={JournalScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
