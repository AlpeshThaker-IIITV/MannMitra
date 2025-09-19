import { useState } from "react";

export function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I'm your MannMitra. How are you feeling today?" },
  ]);

  const sendMessage = async () => {
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();

    setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <div className="h-60 overflow-y-auto border p-2 mb-2 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={\`p-2 rounded-lg \${m.from === "bot" ? "bg-indigo-100 text-blue-800" : "bg-gray-200 text-gray-900 text-right"}\`}
          >
            {m.text.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-500 text-white px-4 py-2 ml-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
