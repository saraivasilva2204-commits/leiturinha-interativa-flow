import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import faviconAsset from "../assets/favicon-destravae.png.asset.json";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "destravae" },
      { name: "description", content: "Destravaê Mind Boost is an interactive educational web app that enhances reading comprehension, memory, and textual interpretation." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "destravae" },
      { property: "og:description", content: "Destravaê Mind Boost is an interactive educational web app that enhances reading comprehension, memory, and textual interpretation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "destravae" },
      { name: "twitter:description", content: "Destravaê Mind Boost is an interactive educational web app that enhances reading comprehension, memory, and textual interpretation." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c0730444-aede-48e8-914b-e81592e28962/id-preview-960d0ea8--31e88baa-aa55-44fb-9f5c-b94be36373e8.lovable.app-1777292974994.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c0730444-aede-48e8-914b-e81592e28962/id-preview-960d0ea8--31e88baa-aa55-44fb-9f5c-b94be36373e8.lovable.app-1777292974994.png" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: faviconAsset.url,
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
