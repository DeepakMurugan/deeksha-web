import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/star-health-insurance";

export const Route = createFileRoute("/star-health-insurance")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Star Health Insurance in Chennai | Deeksha Insurance" },
      { name: "description", content: "Compare Star Health plans in Chennai, including Star Comprehensive family cover. Get guidance on benefits, premiums, cashless hospitals and claims from Deeksha Insurance." },
      { name: "keywords", content: "Star Health insurance Chennai, Star Health agent near me, Star Health Nanganallur, cashless Star Health hospitals" },
      { property: "og:title", content: "Star Health Comprehensive Insurance in Chennai | Deeksha Insurance" },
      { property: "og:description", content: "Compare Star Health plans in Chennai, including Star Comprehensive family cover. Get guidance on benefits, premiums, cashless hospitals and claims from Deeksha Insurance." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://deekshainsure.in/star-health-insurance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://deekshainsure.in/star-health-insurance" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} removeCalculators />;
}
