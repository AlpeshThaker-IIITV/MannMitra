import React from 'react';
import { View, Text } from 'react-native';
export default function Header({ title }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-2xl font-bold">{title}</Text>
    </View>
  );
}
