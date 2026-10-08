import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import "../pages/pages.css";
import twConfig from "../lib/tw-config.json";
import { SiteNav } from "../components/SiteNav";

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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("Deeksha Insurance application error", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Deeksha Insurance | Health Insurance in Chennai" },
      {
        name: "description",
        content:
          "Compare health insurance in Chennai for families, parents and senior citizens with local plan guidance and claim support from Deeksha Insurance in Nanganallur.",
      },
      {
        name: "keywords",
        content:
          "health insurance for senior citizens, cheapest health insurance plans for family, health insurance for parents, health insurance in Chennai, family health insurance Chennai, Deeksha Insurance Chennai",
      },
      { name: "author", content: "Deeksha Insurance and Financial Services" },
      { property: "og:site_name", content: "Deeksha Insurance & Financial Services" },
      { property: "og:title", content: "Health Insurance in Chennai | Deeksha Insurance" },
      {
        property: "og:description",
        content:
          "Health insurance guidance in Chennai for families, parents and senior citizens, with local policy and claim support.",
      },
      { property: "og:url", content: "https://deekshainsure.in/" },
      { property: "og:image", content: "https://deekshainsure.in/deeksha-logo.svg" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Nanganallur, Chennai" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "canonical", href: "https://deekshainsure.in/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap",
      },
    ],
    scripts: [
      { src: "https://cdn.tailwindcss.com?plugins=forms,container-queries" },
      { children: `tailwind.config = ${JSON.stringify(twConfig)};` },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "InsuranceAgency",
          name: "Deeksha Insurance and Financial Services",
          image: "https://deekshainsure.in/deeksha-logo.svg",
          url: "https://deekshainsure.in",
          "@id": "https://deekshainsure.in",
          description:
            "Authorized agency for Star Health and ICICI Lombard offering cashless health insurance, motor insurance, life insurance and claim support in Chennai.",
          telephone: "+91-93607-44915",
          email: "info@deekshainsure.in",
          priceRange: "₹₹",
          areaServed: "Chennai, Tamil Nadu",
          knowsAbout: [
            "health insurance for senior citizens in Chennai",
            "health insurance for parents in Chennai",
            "affordable family health insurance plans in Chennai",
            "health insurance in Chennai",
            "cashless health insurance",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "12, 3rd Main Road, NCBS Colony",
            addressLocality: "Chennai",
            addressRegion: "Tamil Nadu",
            postalCode: "600061",
            addressCountry: "IN",
          },
          hasMap: "https://maps.app.goo.gl/i13s9GxiG2tQ6FDG8",
          openingHours: "Mo-Sa 09:30-19:00",
          sameAs: [
            "https://share.google/okfFAiIU7XNvjDLVO",
            "https://facebook.com/deekshainsure",
            "https://instagram.com/deekshainsure",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
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
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
