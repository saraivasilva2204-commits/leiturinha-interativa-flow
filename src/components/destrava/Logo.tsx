import logo from "@/assets/Copilot_20260529_124344.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logo} alt="DESTRAVAÊ" className="h-12 w-auto object-contain" />

      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight text-foreground">DESTRAVAÊ</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
          leia · pense · destrave
        </span>
      </div>
    </div>
  );
}
