import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const BACKEND = Constants.expoConfig.extra.BACKEND_URL;

export default function ChatScreen() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([{ id: 'm1', from: 'bot', text: "Hi — I'm MannMitra. How can I help today?" }]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now().toString(), from: 'user', text };
    setMessages(m => [userMsg, ...m]);
    setText('');

    try {
      const resp = await axios.post(`${BACKEND}/api/chat`, { message: text });
      const botMsg = { id: (Date.now()+1).toString(), from: 'bot', text: resp.data.reply };
      setMessages(m => [botMsg, ...m]);
    } catch (e) {
      const errMsg = { id: (Date.now()+2).toString(), from: 'bot', text: 'Sorry, something went wrong.' };
      setMessages(m => [errMsg, ...m]);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-white p-2">
      <FlatList data={messages} inverted keyExtractor={(item) => item.id} renderItem={({ item }) => (
        <View style={{ alignSelf: item.from === 'user' ? 'flex-end' : 'flex-start', backgroundColor: item.from === 'user' ? '#D1E8FF' : '#F0F0F0', padding: 12, borderRadius: 12, marginVertical: 6 }}>
          <Text>{item.text}</Text>
        </View>
      )} />

      <View className="flex-row items-center">
        <TextInput value={text} onChangeText={setText} placeholder="Write a message..." className="flex-1 border p-3 rounded mr-2" />
        <TouchableOpacity onPress={sendMessage} className="bg-blue-500 px-4 py-3 rounded"><Text className="text-white">Send</Text></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
