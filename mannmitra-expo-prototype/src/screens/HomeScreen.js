import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 bg-white p-4">
      <Header title="MannMitra" />
      <Text className="text-xl font-semibold mt-4">Welcome — small steps matter</Text>

      <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded mt-6" onPress={() => navigation.navigate('Chat')}>
        <Text className="text-white">Open Chatbot</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-green-500 px-6 py-3 rounded mt-3" onPress={() => navigation.navigate('Mood')}>
        <Text className="text-white">Mood Check-in</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-gray-700 px-6 py-3 rounded mt-3" onPress={() => navigation.navigate('Journal')}>
        <Text className="text-white">Journal</Text>
      </TouchableOpacity>
    </View>
  );
}
