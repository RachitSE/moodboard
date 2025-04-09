"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const affirmations = [
  "Breathe. Let go. This very moment is all you have.",
  "You are not your thoughts.",
  "Peace begins with a deep breath.",
  "You’re exactly where you need to be.",
  "Even the darkest night will end and the sun will rise.",
];

const sounds = {
  Rain: { emoji: "🌧️", file: "rain.mp3" },
  Forest: { emoji: "🌲", file: "forest.mp3" },
  Ocean: { emoji: "🌊", file: "ocean.mp3" },
};

export default function CalmCorner() {
  const [quote, setQuote] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSound, setSelectedSound] = useState<keyof typeof sounds>("Rain");

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setQuote(random);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [selectedSound, isPlaying]); // ✅ FIXED: added isPlaying

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]); // ✅ FIXED: no more dangling expression

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="glass flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} loop>
        <source src={`/sounds/${sounds[selectedSound].file}`} type="audio/mpeg" />
      </audio>

      {/* Left Side */}
      <div>
        <h2 className="text-lg font-semibold text-night mb-2">Calm Corner</h2>
        <p className="text-night/70 italic text-sm max-w-md">
          &quot;{quote}&quot;
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Emoji Animation */}
        <motion.div
          className="text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          🧘‍♀️
        </motion.div>

        {/* Sound Picker */}
        <select
          value={selectedSound}
          onChange={(e) => setSelectedSound(e.target.value as keyof typeof sounds)}
          className="bg-white/30 backdrop-blur px-2 py-1 rounded-md text-sm focus:outline-none text-night"
        >
          {Object.entries(sounds).map(([label, { emoji }]) => (
            <option key={label} value={label}>
              {emoji} {label}
            </option>
          ))}
        </select>

        {/* Play/Pause Button */}
        <button
          onClick={toggleAudio}
          className="p-2 rounded-full bg-white/30 backdrop-blur hover:bg-white/40 transition text-night"
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
      </div>
    </motion.div>
  );
}
