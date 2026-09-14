import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Início" },
  { to: "/treino", label: "Treinar" },
  { to: "/evolucao", label: "Minha evolução" },
  { to: "/conquistas", label: "Conquistas" },
] as const;

export function SiteHeader() {
  return (
    <header className="px-6 sm:px-12 py-6 flex items-center justify-between gap-6 w-full border-b border-white/20 bg-gradient-primary">
      <Logo light />
      <nav aria-label="Navegação principal" className="flex items-center gap-1 sm:gap-2 flex-wrap justify-end">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            activeProps={{ className: "rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium bg-white/20 text-white" }}
            activeOptions={{ exact: l.to === "/" }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
