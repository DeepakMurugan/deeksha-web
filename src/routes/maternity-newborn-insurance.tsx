import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/maternity-newborn-insurance";

export const Route = createFileRoute("/maternity-newborn-insurance")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Maternity Health Insurance in Chennai" },
      { name: "description", content: "Compare maternity and newborn health insurance in Chennai with delivery cover and cashless hospital guidance." },
      { name: "keywords", content: "maternity health insurance Chennai, newborn baby insurance, maternity cashless cover, pregnancy insurance Nanganallur" },
      { property: "og:title", content: "Maternity & Newborn Health Insurance in Chennai" },
      { property: "og:description", content: "Maternity and newborn health insurance guidance with cashless hospital support in Chennai." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/maternity-newborn-insurance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://deekshainsure.in/maternity-newborn-insurance" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} removeCalculators />;
}
