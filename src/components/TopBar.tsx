"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white/30 backdrop-blur rounded-xl shadow-lg">
      <h1 className="text-xl font-semibold text-gray-800">MoodBoard</h1>
      {user && (
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-full text-sm font-medium bg-pink-400 text-white hover:bg-pink-500 transition"
        >
          Logout
        </button>
      )}
    </div>
  );
}
