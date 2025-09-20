import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/init';

export default function JournalScreen() {
  const [text, setText] = useState('');
  const save = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    await addDoc(collection(db, 'users', uid, 'journals'), { text, ts: Date.now() });
    setText('');
    alert('Saved');
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-semibold mb-2">Write privately</Text>
      <TextInput multiline value={text} onChangeText={setText} className="border p-3 h-40" />
      <TouchableOpacity onPress={save} className="bg-blue-500 px-4 py-3 rounded mt-3"><Text className="text-white">Save Journal</Text></TouchableOpacity>
    </View>
  );
}
