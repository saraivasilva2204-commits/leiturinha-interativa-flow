import logoAsset from "@/assets/brain-logo.png.asset.json";

const logo = logoAsset.url;

export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {/* App-style icon base */}
      <div className="relative group">
        <div className="absolute -inset-1.5 bg-white/25 blur-lg rounded-[1.75rem] group-hover:bg-white/40 transition duration-500" />
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-[1.5rem] bg-gradient-to-br from-white via-white to-slate-100 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.25)] ring-1 ring-white/60 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
          <img src={logo} alt="DESTRAVAÊ" className="h-12 w-12 sm:h-14 sm:w-14 object-contain" />
        </div>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`font-display text-2xl sm:text-3xl font-semibold tracking-tight ${light ? "text-white" : "text-foreground"}`}>
          DESTRAVAÊ
        </span>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${light ? "text-white/75" : "text-muted-foreground"}`}>Leia</span>
          <span className={`w-1 h-1 rounded-full ${light ? "bg-white/40" : "bg-muted-foreground/40"}`} />
          <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${light ? "text-white/75" : "text-muted-foreground"}`}>Pense</span>
          <span className={`w-1 h-1 rounded-full ${light ? "bg-white/40" : "bg-muted-foreground/40"}`} />
          <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${light ? "text-white/75" : "text-muted-foreground"}`}>Destrave</span>
        </div>
      </div>
    </div>
  );
}

