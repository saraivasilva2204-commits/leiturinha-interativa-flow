import logoAsset from "@/assets/brain-logo.png.asset.json";

const logo = logoAsset.url;

export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logo} alt="DESTRAVAÊ" className="h-12 w-auto object-contain" />

      <div className="flex flex-col leading-none">
        <span className={`font-display text-xl font-semibold tracking-tight ${light ? "text-white" : "text-foreground"}`}>DESTRAVAÊ</span>
        <span className={`text-[10px] uppercase tracking-[0.2em] mt-0.5 ${light ? "text-white/70" : "text-muted-foreground"}`}>
          leia · pense · destrave
        </span>
      </div>
    </div>
  );
}
