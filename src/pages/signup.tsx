"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch  {
      setError("Sign up failed. Please try again.");
    }
  };

  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender via-seafoam to-peach px-4">
        <div className="glass max-w-md w-full space-y-6 text-center">
          <h2 className="text-3xl font-bold text-night">Welcome to Moodboard</h2>
          <p className="text-night/70">Create your account to begin ✨</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white/60 placeholder:text-night/60 text-night focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-white/60 placeholder:text-night/60 text-night focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-night text-white rounded-xl font-semibold hover:bg-night/90 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-night/70">
            Already have an account?{" "}
            <Link href="/login" className="text-night font-medium underline underline-offset-2">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </RedirectIfAuthenticated>
  );
}
