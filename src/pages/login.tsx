"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch {
      setError("Google sign-in failed. Try again.");
    }
  };

  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender via-seafoam to-peach px-4">
        <div className="glass max-w-md w-full space-y-6 text-center">
          <h2 className="text-3xl font-bold text-night">Welcome Back 🌞</h2>
          <p className="text-night/70">Log in to continue your Moodboard journey</p>

          <form onSubmit={handleLogin} className="space-y-4">
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
              Log In
            </button>
          </form>

          <p className="text-sm text-night/70">or</p>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 bg-white/80 rounded-xl font-semibold hover:bg-white transition"
          >
            Sign in with Google
          </button>

          <p className="text-sm text-night/70">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-night font-medium underline underline-offset-2">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </RedirectIfAuthenticated>
  );
}
