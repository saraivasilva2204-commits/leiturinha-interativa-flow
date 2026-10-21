import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, displayNameOf } from "@/hooks/useAuth";
import { Logo } from "./Logo";

export function SiteHeader() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  return (
    <header className="px-6 sm:px-12 py-6 flex items-center justify-between gap-6 w-full border-b border-white/20 bg-gradient-primary">
      <Logo light />

      {!loading && (
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-white/90">
                Olá, {displayNameOf(user)}!
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-sm font-medium rounded-full bg-white/15 text-white px-4 py-2 hover:bg-white/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              search={{ redirect: "/" }}
              className="text-sm font-medium rounded-full bg-white text-primary px-4 py-2 hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Entrar
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
