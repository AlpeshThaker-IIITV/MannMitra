import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export function MoodCheck() {
  const [mood, setMood] = useState("");

  const saveMood = async () => {
    await addDoc(collection(db, "moods"), {
      mood,
      timestamp: new Date(),
    });
    setMood("");
    alert("Mood saved!");
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold">How do you feel today? 🙂</h2>
      <input
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="border rounded p-2 w-full my-2"
        placeholder="Happy, stressed, anxious..."
      />
      <button
        onClick={saveMood}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Save
      </button>
    </div>
  );
}
