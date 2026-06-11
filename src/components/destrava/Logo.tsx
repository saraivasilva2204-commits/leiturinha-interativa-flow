import logoAsset from "@/assets/brain-logo.png.asset.json";

const logo = logoAsset.url;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-1.5 bg-white/25 blur-lg rounded-[1.75rem] group-hover:bg-white/40 transition duration-500" />
      <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-[1.25rem] bg-gradient-to-br from-white via-white to-slate-100 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.25)] border-2 border-white flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <img src={logo} alt="DESTRAVAÊ" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
      </div>
    </div>
  );
}

