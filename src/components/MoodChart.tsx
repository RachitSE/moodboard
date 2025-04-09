"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAllEntries } from "@/lib/entryUtils";
import { format } from "date-fns";

type MoodEntry = {
  originalDate: string;
  date: string;
  mood: number;
  emoji: string;
};

const moodToScore = (mood: string): number => {
  switch (mood) {
    case "happy":
      return 5;
    case "sleepy":
      return 4;
    case "neutral":
      return 3;
    case "sad":
      return 2;
    case "angry":
      return 1;
    default:
      return 3;
  }
};

export default function MoodChart() {
  const { user } = useAuth();
  const [data, setData] = useState<MoodEntry[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const entries = await getAllEntries(user.uid);

      const formatted: MoodEntry[] = Object.entries(entries)
        .map(([date, entry]) => {
          const moodName =
            entry.mood?.split("/").pop()?.replace(".png", "") || "neutral";
          return {
            originalDate: date,
            date: format(new Date(date), "MMM d"),
            mood: moodToScore(moodName),
            emoji: `/emojis/${moodName}.png`,
          };
        })
        .sort(
          (a, b) =>
            new Date(a.originalDate).getTime() -
            new Date(b.originalDate).getTime()
        );

      setData(formatted);
    };

    fetchData();
  }, [user]);

  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-lg font-semibold mb-4">Mood Timeline</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 10, bottom: 10, right: 20 }}>
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tickLine={false}
            axisLine={false}
            width={30}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={({ active, payload }) =>
              active && payload && payload.length ? (
                <div className="p-2 bg-white/80 backdrop-blur rounded-xl text-sm shadow-xl">
                  {payload[0].payload.date}:{" "}
                  <span className="font-bold">{payload[0].payload.mood}</span>
                </div>
              ) : null
            }
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#F4A261"
            strokeWidth={2}
            dot={({ cx, cy, payload }: { cx?: number; cy?: number; payload: MoodEntry }) => (
  <image
    xlinkHref={payload.emoji}
    x={cx! - 12}
    y={cy! - 12}
    height="24"
    width="24"
  />
)}

            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
