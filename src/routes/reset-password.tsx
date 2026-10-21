import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/destrava/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Criar nova senha — DESTRAVAÊ" },
      {
        name: "description",
        content: "Defina uma nova senha para sua conta do DESTRAVAÊ.",
      },
      { property: "og:title", content: "Criar nova senha — DESTRAVAÊ" },
      {
        property: "og:description",
        content: "Defina uma nova senha para sua conta do DESTRAVAÊ.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams(window.location.hash.slice(1));
    const isRecovery = params.get("type") === "recovery";
    const validateSession = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (active) setReady(!error && Boolean(data.user));
      } catch {
        if (active) setReady(false);
      } finally {
        if (active) setChecking(false);
      }
    };
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      // Defer auth calls until the auth event has finished processing.
      if (event === "PASSWORD_RECOVERY") setTimeout(() => void validateSession(), 0);
    });
    // getSession waits for the URL tokens to be processed, including when the
    // recovery event was emitted before this page subscribed.
    if (isRecovery && params.get("access_token") && params.get("refresh_token")) {
      void supabase.auth.getSession().then(() => validateSession()).catch(() => {
        if (active) setChecking(false);
      });
    } else {
      setChecking(false);
    }
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("A nova senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem. Digite novamente.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      setError("Não foi possível salvar a nova senha. Peça um novo link de recuperação.");
      return;
    }
    setDone(true);
    setTimeout(() => navigate({ to: "/" }), 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-bg">
      <header className="px-6 sm:px-12 py-6 flex items-center justify-between gap-6 w-full border-b border-white/20 bg-gradient-primary">
        <Link to="/" aria-label="Voltar para a página inicial">
          <Logo light />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h1 className="font-display text-3xl font-semibold text-foreground text-center">
              Criar nova senha
            </h1>

    {checking && <p role="status" className="mt-4 text-center text-sm text-muted-foreground">Verificando seu link...</p>}
    {!checking && !ready && (
              <div className="mt-4 text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Este link de recuperação é inválido ou já foi usado.
                </p>
                <Link
                  to="/auth"
                  search={{ redirect: "/" }}
                  className="inline-block text-sm text-primary font-medium hover:underline"
                >
                  Pedir um novo link
                </Link>
              </div>
            )}

            {ready && done && (
              <p role="status" className="mt-4 text-sm text-primary bg-primary/10 rounded-lg px-3 py-2 text-center">
                Senha atualizada com sucesso! Redirecionando...
              </p>
            )}

            {ready && !done && (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-foreground mb-1.5">
                    Nova senha
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Mínimo de 6 caracteres"
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-foreground mb-1.5">
                    Confirmar nova senha
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Repita a nova senha"
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                  {busy ? "Salvando..." : "Salvar nova senha"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
