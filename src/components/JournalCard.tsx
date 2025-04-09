"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { saveEntry, getEntry } from "@/lib/entryUtils";
import { format } from "date-fns";

export default function JournalCard() {
  const [entry, setEntry] = useState("");
  const { user } = useAuth();
  const today = format(new Date(), "yyyy-MM-dd");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // 🧠 Fetch journal if it exists
  useEffect(() => {
    if (!user) return;
    const fetchEntry = async () => {
      const data = await getEntry(user.uid, today);
      if (data?.journal) setEntry(data.journal);
    };
    fetchEntry();
  }, [user, today]);

  // 💾 Save journal
  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await saveEntry(user.uid, today, { journal: entry });
      setSaved(true);
    } catch (err) {
      console.error("Error saving journal:", err);
    } finally {
      setLoading(false);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="glass space-y-4">
      <h2 className="text-lg font-semibold">Your Journal</h2>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={5}
        placeholder="Write about your day..."
        className="w-full resize-none bg-white/20 backdrop-blur-md rounded-xl p-4 text-night placeholder:text-night/60 focus:outline-none focus:ring-2 focus:ring-peach shadow-inner"
      />
      <div className="flex justify-between items-center">
        {saved && <p className="text-sm text-green-700">Saved!</p>}
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-4 py-2 rounded-xl bg-black text-white font-semibold shadow-lg hover:bg-peach/80 transition ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
