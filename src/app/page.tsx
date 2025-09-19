"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("playful");
  const [length, setLength] = useState("medium");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateThread = async () => {
    setLoading(true);
    setResult("");
    try {
      const resp = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone, length }),
      });
      const data = await resp.json();
      setResult(data.result || "No result"); // <--- pakai data.result
    } catch (err: any) {
      setResult("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
          🧵 ThreadSmith
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Turn your idea into a ready-to-post Twitter/X thread.
        </p>

        {/* Topic Input */}
        <textarea
          className="w-full p-4 border rounded-xl mb-6 focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder-gray-400"
          rows={3}
          placeholder="Enter your topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full border rounded-xl p-2 font-medium text-white focus:ring-2 focus:ring-blue-500 outline-none
                 bg-gradient-to-r from-blue-500 to-indigo-500"
            >
              <option className="text-gray-800" value="playful">Playful</option>
              <option className="text-gray-800" value="serious">Serious</option>
              <option className="text-gray-800" value="edgy">Edgy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Length</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full border rounded-xl p-2 font-medium text-white focus:ring-2 focus:ring-purple-500 outline-none
                 bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <option className="text-gray-800" value="short">Short (3 posts)</option>
              <option className="text-gray-800" value="medium">Medium (5 posts)</option>
              <option className="text-gray-800" value="long">Long (7 posts)</option>
            </select>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={generateThread}
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition"
        >
          {loading ? "✨ Crafting your thread..." : "Generate Thread"}
        </button>

        {/* Output */}
        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3 text-gray-800">Result:</h2>
            <pre className="whitespace-pre-wrap bg-gray-50 border rounded-xl p-4 text-gray-700 leading-relaxed">
              {result}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
