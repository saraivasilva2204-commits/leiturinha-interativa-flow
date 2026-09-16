import { useEffect, useRef, useState } from "react";
import logo from "@/assets/brain-logo-v3.png";

const SESSION_KEY = "destravae:splash:entered";

export function useSplashEntered() {
  const [entered, setEntered] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setEntered(sessionStorage.getItem(SESSION_KEY) === "1");
    } catch {
      setEntered(false);
    }
  }, []);

  const markEntered = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    setEntered(true);
  };

  return { entered, markEntered };
}

export function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      onEnter();
    }, 520);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleEnter();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-gradient-to-br from-[#0F0818] via-[#1A0F2E] to-[#2A1540] splash-out ${leaving ? "splash-leaving" : ""}`}
      role="img"
      aria-label="Tela de abertura do DESTRAVAÊ"
    >
      {/* subtle radial glow behind logo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vmin] h-[40vmin] rounded-full bg-primary/15 blur-[80px]" />
      </div>

      <button
        ref={buttonRef}
        onClick={handleEnter}
        onKeyDown={handleKeyDown}
        className="relative z-10 flex flex-col items-center gap-6 group cursor-pointer splash-logo focus:outline-none"
        aria-label="Clique para entrar no DESTRAVAÊ"
        type="button"
      >
        <div className="relative">
          <img
            src={logo}
            alt=""
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain drop-shadow-[0_0_28px_rgba(138,43,226,0.45)] transition-transform duration-500 ease-out group-hover:scale-105 group-active:scale-95"
          />
          <span className="sr-only">Cérebro roxo e preto do DESTRAVAÊ</span>
        </div>

        <div className="text-center">
          <p className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            DESTRAVAÊ
          </p>
          <p className="mt-2 text-sm sm:text-base text-white/60 tracking-wide">
            Clique para entrar
          </p>
        </div>
      </button>
    </div>
  );
}
