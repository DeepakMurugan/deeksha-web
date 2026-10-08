import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/StaticPage";
import { html, scripts } from "@/pages/contact";

export const Route = createFileRoute("/contact")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Contact Deeksha Insurance | Insurance agency near me " },
      { name: "description", content: "Contact Deeksha Insurance in Nanganallur, Chennai for health insurance quotes for families and parents, policy questions and claim support." },
      { name: "keywords", content: "contact insurance agent Chennai, cashless claim help Nanganallur, Deeksha Insurance phone number, insurance renewal Chennai" },
      { property: "og:title", content: "Contact Deeksha Insurance | Chennai Policy Support" },
      { property: "og:description", content: "Speak with Deeksha Insurance in Chennai about health insurance options, quotes and claim support." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://deekshainsure.in/contact" }],
  }),
});

function Page() {
  return <StaticPage html={html} scripts={scripts} removeCalculators />;
}
