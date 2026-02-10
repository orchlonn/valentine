"use client";

import { useState, useEffect, useCallback, useRef } from "react";

function FallingHearts() {
  const [hearts, setHearts] = useState<
    { id: number; left: number; delay: number; duration: number; size: number }[]
  >([]);

  useEffect(() => {
    const initial = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      size: 14 + Math.random() * 20,
    }));
    setHearts(initial);

    let counter = 15;
    const interval = setInterval(() => {
      setHearts((prev) => {
        const next = [
          ...prev.slice(-20),
          {
            id: counter++,
            left: Math.random() * 100,
            delay: 0,
            duration: 4 + Math.random() * 6,
            size: 14 + Math.random() * 20,
          },
        ];
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="falling-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
            opacity: 0.15 + Math.random() * 0.2,
          }}
        >
          {Math.random() > 0.5 ? "\u2764\ufe0f" : "\u{1F497}"}
        </div>
      ))}
    </>
  );
}

function Confetti() {
  const [pieces, setPieces] = useState<
    { id: number; left: number; color: string; duration: number; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    const colors = ["#ff6b8a", "#ff4081", "#e91e63", "#f8bbd0", "#ffcdd2", "#ff8a80", "#ffd700", "#fff"];
    const items = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
      size: 6 + Math.random() * 10,
    }));
    setPieces(items);
  }, []);

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </>
  );
}

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [moved, setMoved] = useState(false);
  const noRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = useCallback(() => {
    const maxX = typeof window !== "undefined" ? window.innerWidth - 150 : 500;
    const maxY = typeof window !== "undefined" ? window.innerHeight - 60 : 500;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    setNoPos({ x: newX, y: newY });
    setMoved(true);
  }, []);

  if (accepted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center relative">
        <FallingHearts />
        <Confetti />
        <div className="animate-celebrate z-10 flex flex-col items-center gap-6 px-6 text-center">
          <div className="text-8xl mb-2">{"\u{1F496}"}</div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent">
            Yay!!!
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold text-rose-700 mt-2">
            I knew you&apos;d say yes!
          </p>
          <div className="mt-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-rose-200 shadow-xl px-8 py-6 max-w-sm">
            <p className="text-lg font-medium text-rose-800 mb-3">
              It&apos;s a date! {"\u{1F389}"}
            </p>
            <div className="space-y-2 text-rose-700">
              <p className="flex items-center gap-2 justify-center text-base">
                <span>{"\u{1F4C5}"}</span> February 14, 2025
              </p>
              <p className="flex items-center gap-2 justify-center text-base">
                <span>{"\u23f0"}</span> 6:00 PM
              </p>
              <p className="flex items-center gap-2 justify-center text-base">
                <span>{"\u{1F35D}"}</span> Pasta Company
              </p>
            </div>
          </div>
          <p className="text-rose-400 mt-4 text-base">
            Can&apos;t wait to see you there {"\u2764\ufe0f"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative">
      <FallingHearts />

      <div className="z-10 flex flex-col items-center gap-6 px-6 text-center">
        <div className="text-7xl sm:text-8xl animate-float mb-2">{"\u{1F497}"}</div>

        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent leading-tight">
          Will You Be My Valentine?
        </h1>

        <div className="mt-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-rose-200 shadow-lg px-8 py-5 max-w-sm">
          <div className="space-y-2 text-rose-700">
            <p className="flex items-center gap-2 justify-center text-base">
              <span>{"\u{1F4C5}"}</span> February 14, 2025
            </p>
            <p className="flex items-center gap-2 justify-center text-base">
              <span>{"\u23f0"}</span> 6:00 PM
            </p>
            <p className="flex items-center gap-2 justify-center text-base">
              <span>{"\u{1F35D}"}</span> Pasta Company
            </p>
          </div>
        </div>

        <div className="flex gap-6 mt-4 items-center">
          <button
            onClick={() => setAccepted(true)}
            className="animate-pulse-glow rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-10 py-4 text-xl font-bold text-white shadow-lg shadow-rose-300/50 transition-all hover:scale-110 hover:shadow-xl hover:shadow-rose-400/60 cursor-pointer"
          >
            Yes! {"\u{1F496}"}
          </button>

          {!moved && (
            <button
              ref={noRef}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              className="rounded-full border-2 border-rose-300 bg-white px-10 py-4 text-xl font-bold text-rose-400 shadow transition-all cursor-pointer"
            >
              No
            </button>
          )}
        </div>
      </div>

      {moved && (
        <button
          ref={noRef}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          className="fixed rounded-full border-2 border-rose-300 bg-white px-10 py-4 text-xl font-bold text-rose-400 shadow transition-all cursor-pointer z-50"
          style={{
            left: `${noPos.x}px`,
            top: `${noPos.y}px`,
          }}
        >
          No
        </button>
      )}
    </div>
  );
}
