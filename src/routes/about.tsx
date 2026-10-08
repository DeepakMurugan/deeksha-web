import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/about";

export const Route = createFileRoute("/about")({
  component: Page,
  head: () => ({
    meta: [
      { title: "About Deeksha Insurance | Health insurance in Chennai" },
      { name: "description", content: "Meet Deeksha Insurance & Financial Services in Nanganallur, Chennai. Get local guidance on health insurance for families, parents and senior citizens." },
      { name: "keywords", content: "Deeksha Insurance Chennai, insurance agency Nanganallur, health insurance advisor Chennai, financial services Chennai" },
      { property: "og:title", content: "About Deeksha Insurance | Chennai Health Plan Guidance" },
      { property: "og:description", content: "Local insurance guidance in Chennai for family, parents and senior citizen health cover." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://deekshainsure.in/about" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} removeCalculators />;
}
