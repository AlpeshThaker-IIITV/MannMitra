import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db, auth } from '../firebase/init';

const MOODS = [
  { id: '1', label: 'Happy', emoji: '😊' },
  { id: '2', label: 'Calm', emoji: '😌' },
  { id: '3', label: 'Anxious', emoji: '😟' },
  { id: '4', label: 'Sad', emoji: '😔' }
];

export default function MoodScreen() {
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const q = query(collection(db, 'users', uid, 'moods'), orderBy('ts', 'desc'), limit(20));
    const unsub = onSnapshot(q, snap => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setHistory(arr);
    });
    return () => unsub();
  }, []);

  const saveMood = async (mood) => {
    const uid = auth.currentUser?.uid;
    const entry = { mood, ts: Date.now() };
    await addDoc(collection(db, 'users', uid, 'moods'), entry);
    setSelected(mood);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-semibold mb-4">How are you feeling today?</Text>
      <View className="flex-row">
        {MOODS.map(m => (
          <TouchableOpacity key={m.id} onPress={() => saveMood(m)} className="m-2 p-4 border rounded items-center">
            <Text className="text-2xl">{m.emoji}</Text>
            <Text className="mt-2">{m.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selected && <Text className="mt-6">Saved: {selected.emoji} {selected.label}</Text>}

      <View className="mt-8">
        <Text className="font-semibold mb-2">Recent moods</Text>
        {history.length === 0 ? (
          <Text>No entries yet.</Text>
        ) : (
          history.map((h) => (
            <View key={h.id} className="flex-row items-center py-2">
              <Text className="mr-3">{h.mood.emoji}</Text>
              <Text>{h.mood.label} • {new Date(h.ts).toLocaleString()}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}
