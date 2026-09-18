import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="px-6 sm:px-12 py-6 flex items-center justify-between gap-6 w-full border-b border-white/20 bg-gradient-primary">
      <Logo light />
    </header>
  );
}
