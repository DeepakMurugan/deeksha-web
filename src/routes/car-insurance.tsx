import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/car-insurance";

export const Route = createFileRoute("/car-insurance")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Car Insurance in Chennai | icici car insurance in chennai" },
      { name: "description", content: "Renew car insurance in Chennai with zero-depreciation cover. " },
      { name: "keywords", content: "ICICI car insurance Chennai, car insurance renewal Nanganallur, zero depreciation car insurance, " },
      { property: "og:title", content: "Car Insurance in Chennai | Renewal & Cover Options" },
      { property: "og:description", content: "Instant car insurance renewal in Chennai with zero depreciation, NCB protection and cashless garages near Nanganallur." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/car-insurance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://deekshainsure.in/car-insurance" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} removeCalculators />;
}
