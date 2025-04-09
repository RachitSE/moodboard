"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { getAllEntries } from "@/lib/entryUtils";
import { format } from "date-fns";

type Entry = {
  id: string;
  mood: string; // full emoji image path
  date: string;
  text: string;
};

export default function JournalTimeline() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchEntries = async () => {
      const data = await getAllEntries(user.uid);

      const formatted = Object.entries(data).map(([date, entry]) => ({
        id: date,
        mood: entry.mood?.startsWith("/")
          ? entry.mood
          : `/emojis/${entry.mood?.toLowerCase() || "neutral"}.png`,
        date: format(new Date(date), "MMMM d, yyyy"),
        text: entry.journal || "No journal entry.",
      }));

      setEntries(formatted.reverse());
    };

    fetchEntries();
  }, [user]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-night/80">Your Journal</h2>

      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          className="glass flex items-start gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Image
            src={entry.mood}
            alt="mood"
            width={48}
            height={48}
            className="rounded-full bg-white bg-opacity-40 p-1 backdrop-blur-md"
          />
          <div className="flex-1">
            <p className="text-sm text-night/60">{entry.date}</p>
            <p className="text-lg text-night mt-1">
              {expanded === entry.id
                ? entry.text
                : `${entry.text.slice(0, 80)}...`}
            </p>
            <button
              onClick={() =>
                setExpanded(expanded === entry.id ? null : entry.id)
              }
              className="text-sm text-blue-500 mt-1"
            >
              {expanded === entry.id ? "Show less" : "Read more"}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
