import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/senior-citizen-health-insurance";

export const Route = createFileRoute("/senior-citizen-health-insurance")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Health Insurance for Senior Citizens in Chennai | Parents" },
      { name: "description", content: "Compare health insurance for senior citizens and parents in Chennai. Review eligibility, waiting periods, co-payments with certified advisor." },
      { name: "keywords", content: "health insurance for senior citizens, senior citizen health insurance Chennai, health insurance for parents, health insurance above 60age" },
      { property: "og:title", content: "Health Insurance for Senior Citizens in Chennai | Parents" },
      { property: "og:description", content: "Understand senior citizen and parents health insurance options in Chennai, including eligibility, waiting periods and local claim support." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/senior-citizen-health-insurance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://deekshainsure.in/senior-citizen-health-insurance" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} removeCalculators />;
}
