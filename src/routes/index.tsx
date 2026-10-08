import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/index";

export const Route = createFileRoute("/")({
  component: Page,
  head: () => ({
    meta:

    [
  { title: "Best Health Insurance in Chennai | Family & Senior Plans" },
  { name: "description", content: "Compare health insurance plans in Chennai. Family floater, parents & senior citizen cashless insurance in Nanganallur. Get a free quote." },
  { name: "keywords", content: "health insurance for senior citizens, cheapest health insurance plans for family, health insurance for parents, health insurance in Chennai, family health insurance plans Chennai" },
  { property: "og:title", content: "Health Insurance in Chennai | Family, Parents & Senior Plans" },
  { property: "og:description", content: "Explore health insurance in Chennai for families, parents and senior citizens, with local policy guidance and claim support." },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "/" },
  { name: "twitter:card", content: "summary_large_image" },
],


    links: [{ rel: "canonical", href: "https://deekshainsure.in/" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} homepageSeo />;
}
