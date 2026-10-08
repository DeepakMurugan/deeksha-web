import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/star-health-insurance";

export const Route = createFileRoute("/star-health-insurance")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Star Health Insurance in Chennai | Deeksha Insurance" },
      { name: "description", content: "Explore Star Health insurance in Chennai with plan guidance, cashless hospitals Insurance in chennai." },
      { name: "keywords", content: "Star Health insurance Chennai, Star Health agent near me, Star Health Nanganallur, cashless Star Health hospitals" },
      { property: "og:title", content: "Star Health Insurance in Chennai | Deeksha Insurance" },
      { property: "og:description", content: "Star Health plan guidance, enrolment and cashless Insurance in Chennai." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/star-health-insurance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://deekshainsure.in/star-health-insurance" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} removeCalculators />;
}
