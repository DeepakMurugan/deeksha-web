import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/family-floater-health-insurance";

export const Route = createFileRoute("/family-floater-health-insurance")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Family Floater Health Insurance in Chennai | Deeksha Insurance" },
      { name: "description", content: "Compare affordable family health insurance plans in Chennai by premium, sum insured, room limits and waiting periods. Get a free quote." },
      { name: "keywords", content: "cheapest health insurance plans for family, affordable family health insurance Chennai, health insurance for family Chennai, family floater health insurance Chennai, cashless family health plan" },
      { property: "og:title", content: "Affordable Family Health Insurance Plans in Chennai" },
      { property: "og:description", content: "Compare affordable family health insurance plans in Chennai by premium, sum insured, room limits and waiting periods. Get a free quote." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/family-floater-health-insurance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://deekshainsure.in/family-floater-health-insurance" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} removeCalculators />;
}
