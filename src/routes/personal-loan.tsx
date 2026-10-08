import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/personal-loan";

export const Route = createFileRoute("/personal-loan")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Personal Loans in Chennai | Eligibility & Application Help" },
      { name: "description", content: "Get personal loan eligibility and application support in Chennai with clear guidance on documents, rates and repayment." },
      { name: "keywords", content: "ICICI Bank personal loan Chennai, instant personal loan, personal loan eligibility, personal loan documents Chennai" },
      { property: "og:title", content: "Personal Loans in Chennai | Eligibility & Application Help" },
      { property: "og:description", content: "Get personal loan eligibility and application support in Chennai with clear guidance on documents, rates and repayment." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/personal-loan" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://deekshainsure.in/personal-loan" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} removeCalculators />;
}
