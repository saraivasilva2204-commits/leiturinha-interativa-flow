import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/destrava/Logo";
import { Button } from "@/components/ui/button";

type Mode = "login" | "signup" | "forgot";

function sanitizeRedirect(value: unknown): string {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  if (value.startsWith("/auth")) return "/";
  return value;
}

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: sanitizeRedirect(search.redirect),
  }),
  head: () => ({
    meta: [
      { title: "Entrar ou criar conta — DESTRAVAÊ" },
      {
        name: "description",
        content:
          "Acesse sua conta do DESTRAVAÊ ou crie uma nova para treinar leitura, memória e interpretação.",
      },
      { property: "og:title", content: "Entrar ou criar conta — DESTRAVAÊ" },
      {
        property: "og:description",
        content:
          "Acesse sua conta do DESTRAVAÊ ou crie uma nova para treinar leitura, memória e interpretação.",
      },
    ],
  }),
  component: AuthPage,
});

function friendlyError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "E-mail ou senha incorretos. Confira e tente novamente.";
  if (m.includes("user already registered"))
    return "Este e-mail já tem uma conta. Tente entrar ou recupere sua senha.";
  if (m.includes("password"))
    return "A senha precisa ter pelo menos 6 caracteres.";
  if (m.includes("email")) return "Confira o e-mail digitado e tente novamente.";
  return "Não foi possível concluir agora. Tente novamente em instantes.";
}

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const resetFeedback = () => {
    setError(null);
    setNotice(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: redirect });
        return;
      }
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name.trim() },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        setNotice(
          "Conta criada! Enviamos um e-mail de confirmação para você. Clique no link para ativar sua conta e depois entre aqui."
        );
        setMode("login");
        return;
      }
      // forgot
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setNotice(
        "Se este e-mail estiver cadastrado, você vai receber um link para criar uma nova senha. Confira sua caixa de entrada."
      );
    } catch (err) {
      setError(friendlyError(err instanceof Error ? err.message : String(err)));
    } finally {
      setBusy(false);
    }
  };

  const title =
    mode === "login"
      ? "Entrar na sua conta"
      : mode === "signup"
        ? "Criar sua conta"
        : "Recuperar senha";

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
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground text-center">
              {mode === "login" && "Bem-vindo de volta! Continue seu treino de leitura."}
              {mode === "signup" && "Leva menos de um minuto. Vamos lá!"}
              {mode === "forgot" && "Digite seu e-mail e enviaremos um link para criar uma nova senha."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <div>
                  <label htmlFor="auth-name" className="block text-sm font-medium text-foreground mb-1.5">
                    Como podemos te chamar?
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="Seu nome ou apelido"
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              )}

              <div>
                <label htmlFor="auth-email" className="block text-sm font-medium text-foreground mb-1.5">
                  E-mail
                </label>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="voce@exemplo.com"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              {mode !== "forgot" && (
                <div>
                  <label htmlFor="auth-password" className="block text-sm font-medium text-foreground mb-1.5">
                    Senha
                  </label>
                  <input
                    id="auth-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    placeholder="Mínimo de 6 caracteres"
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              )}

              {error && (
                <p role="alert" className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              {notice && (
                <p role="status" className="text-sm text-primary bg-primary/10 rounded-lg px-3 py-2">
                  {notice}
                </p>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                {busy
                  ? "Aguarde..."
                  : mode === "login"
                    ? "Entrar"
                    : mode === "signup"
                      ? "Criar conta"
                      : "Enviar link de recuperação"}
              </Button>
            </form>

            <div className="mt-6 space-y-2 text-center text-sm">
              {mode === "login" && (
                <>
                  <button
                    type="button"
                    onClick={() => { setMode("forgot"); resetFeedback(); }}
                    className="block w-full text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Esqueci minha senha
                  </button>
                  <p className="text-muted-foreground">
                    Ainda não tem conta?{" "}
                    <button
                      type="button"
                      onClick={() => { setMode("signup"); resetFeedback(); }}
                      className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    >
                      Criar conta
                    </button>
                  </p>
                </>
              )}
              {mode === "signup" && (
                <p className="text-muted-foreground">
                  Já tem uma conta?{" "}
                  <button
                    type="button"
                    onClick={() => { setMode("login"); resetFeedback(); }}
                    className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Entrar
                  </button>
                </p>
              )}
              {mode === "forgot" && (
                <button
                  type="button"
                  onClick={() => { setMode("login"); resetFeedback(); }}
                  className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Voltar para o login
                </button>
              )}
            </div>
          </div>

          <p className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Voltar para o início
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
