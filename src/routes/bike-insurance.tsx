import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/bike-insurance";

export const Route = createFileRoute("/bike-insurance")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Bike Insurance in Chennai | Two-Wheeler Renewal" },
      { name: "description", content: "Renew bike and two-wheeler insurance in Chennai with third-party, comprehensive and lapsed-policy support." },
      { name: "keywords", content: "bike insurance Chennai, two wheeler insurance renewal, ICICI bike insurance, scooter insurance Nanganallur" },
      { property: "og:title", content: "Bike Insurance in Chennai | Two-Wheeler Renewal" },
      { property: "og:description", content: "Bike insurance renewal in Chennai in five minutes on WhatsApp, including third-party, comprehensive and expired policy inspection help." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/bike-insurance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://deekshainsure.in/bike-insurance" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} removeCalculators />;
}
