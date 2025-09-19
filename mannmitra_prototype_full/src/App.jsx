import { useState } from "react";
import { MoodCheck } from "./components/MoodCheck";
import { Journal } from "./components/Journal";
import { Chatbot } from "./components/Chatbot";
import { PositivePathway } from "./components/PositivePathway";
import { Relaxation } from "./components/Relaxation";
import { InspireLibrary } from "./components/InspireLibrary";

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <h1 className="text-2xl font-bold text-center">🌿 MannMitra</h1>
      <nav className="flex gap-2 justify-center my-4">
        {["mood", "journal", "chat", "pathway", "relax", "library"].map((s) => (
          <button
            key={s}
            className="px-3 py-1 rounded-lg bg-indigo-500 text-white"
            onClick={() => setScreen(s)}
          >
            {s}
          </button>
        ))}
      </nav>

      {screen === "mood" && <MoodCheck />}
      {screen === "journal" && <Journal />}
      {screen === "chat" && <Chatbot />}
      {screen === "pathway" && <PositivePathway />}
      {screen === "relax" && <Relaxation />}
      {screen === "library" && <InspireLibrary />}
    </div>
  );
}
