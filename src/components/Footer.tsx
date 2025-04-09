"use client";

export default function Footer() {
  return (
    <footer className="mt-12 py-6 text-center text-sm text-night/50 backdrop-blur-sm bg-white/10 rounded-xl shadow-inner">
      <p>
        Made with ❤️ by <span className="font-medium text-night">Rachit</span> ·{" "}
        <a
          href="https://instagram.com/r4chit._"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          @r4chit._
        </a>
      </p>
    </footer>
  );
}
