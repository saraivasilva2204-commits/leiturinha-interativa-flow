import logo from "@/assets/brain-logo-v2.png";

export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <img src={logo} alt="DESTRAVAÊ" className="h-14 w-14 sm:h-16 sm:w-16 object-contain flex-shrink-0" />
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

