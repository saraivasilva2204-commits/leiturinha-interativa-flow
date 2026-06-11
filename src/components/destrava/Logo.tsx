import logoAsset from "@/assets/brain-logo.png.asset.json";

const logo = logoAsset.url;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="DESTRAVAÊ"
      className={`h-14 w-14 sm:h-16 sm:w-16 object-contain ${className}`}
    />
  );
}

