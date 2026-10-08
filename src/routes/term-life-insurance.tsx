import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/term-life-insurance";

export const Route = createFileRoute("/term-life-insurance")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Term Insurance in Chennai | Life Cover for Families" },
      { name: "description", content: "Compare term life insurance in Chennai for family protection with high cover, tax guidance and simple policy support." },
      { name: "keywords", content: "term life insurance Chennai, family protection insurance, life insurance Nanganallur, term plan advisor" },
      { property: "og:title", content: "Term Insurance in Chennai | Life Cover for Families" },
      { property: "og:description", content: "Compare pure term life insurance plans in Chennai up to Rs 5 crore, with 80C tax benefits and honest, commission-free guidance." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/term-life-insurance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://deekshainsure.in/term-life-insurance" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} removeCalculators />;
}
