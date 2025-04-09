"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { saveEntry, getEntry } from "@/lib/entryUtils";
import { format } from "date-fns";
import Image from "next/image";

const emojis = [
  { src: "/emojis/happy.png", label: "Happy" },
  { src: "/emojis/neutral.png", label: "Neutral" },
  { src: "/emojis/sad.png", label: "Sad" },
  { src: "/emojis/angry.png", label: "Angry" },
  { src: "/emojis/sleepy.png", label: "Sleepy" },
];

export default function MoodPicker() {
  const [selected, setSelected] = useState<string | null>(null);
  const { user } = useAuth();

  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (!user) return;
    const fetchMood = async () => {
      const entry = await getEntry(user.uid, today);
      if (entry?.mood) {
        setSelected(entry.mood);
      }
    };
    fetchMood();
  }, [user, today]);

  const handleMoodSelect = async (mood: string) => {
    setSelected(mood);
    if (user) {
      await saveEntry(user.uid, today, { mood });
    }
  };

  return (
    <div className="glass">
      <h2 className="text-lg font-semibold mb-4">Today, you&apos;re feeling...</h2>
      <div className="flex space-x-4">
        {emojis.map((emoji) => (
          <button
            key={emoji.label}
            onClick={() => handleMoodSelect(emoji.label)}
            className={`transition transform rounded-full p-2 ${
              selected === emoji.label
                ? "ring-4 ring-white ring-opacity-50 scale-105"
                : "hover:scale-105"
            }`}
          >
            <Image
              src={emoji.src}
              alt={emoji.label}
              width={40}
              height={40}
              draggable={false}
            />
          </button>
        ))}
        <button className="bg-white/30 hover:bg-white/50 text-xl w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-inner transition">
          +
        </button>
      </div>
    </div>
  );
}
