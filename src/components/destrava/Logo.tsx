import logoAsset from "@/assets/brain-logo.png.asset.json";

const logo = logoAsset.url;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logo} alt="DESTRAVAÊ" className="h-12 w-auto object-contain" />

      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight text-[#8B3DFF]">DESTRAVAÊ</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#B794F6] mt-0.5">
          leia · pense · destrave
        </span>
      </div>
    </div>
  );
}
