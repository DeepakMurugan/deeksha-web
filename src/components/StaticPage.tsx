import { useEffect } from "react";

interface StaticPageProps {
  html: string;
  scripts?: string[];
  removeCalculators?: boolean;
  homepageSeo?: boolean;
}

/**
 * Renders a designed marketing page (server-rendered HTML) and re-executes the
 * page's inline behaviour scripts (calculators, tabs, forms) after hydration.
 */
const calculatorMarkers = [
  "tpPremium",
  "compPremium",
  "carModel",
  "sum-insured-range",
  "calculated-premium",
  "pregStatus",
  "loanAmount",
  "seniorPlanForm",
  "hlv-calculator-form",
];

function removeCalculatorSections(source: string) {
  let result = source;

  for (const marker of calculatorMarkers) {
    const markerIndex = result.indexOf(marker);
    if (markerIndex === -1) continue;

    const sectionStart = result.lastIndexOf("<section", markerIndex);
    const sectionEnd = result.indexOf("</section>", markerIndex);
    if (sectionStart !== -1 && sectionEnd !== -1) {
      result = `${result.slice(0, sectionStart)}${result.slice(sectionEnd + "</section>".length)}`;
    }
  }

  return result;
}

function markHeroSection(source: string) {
  return source.replace(
    /<section\s+class="([^"]*(?:bg-primary|bg-surface-pure|bg-gradient)[^"]*)"/i,
    '<section class="page-hero $1"',
  );
}

function normalizePageLayout(source: string) {
  return source.replace(/(<main\b[^>]*class=")([^"]*)(")/i, (_match, start, classes, end) => {
    const normalizedClasses = classes
      .replace(/\bpt-(?:28|\[116px\])\b/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    return `${start}${normalizedClasses}${end}`;
  });
}

const businessAddress = "12, 3rd Main Road, NCBS Colony, Nanganallur, Chennai, Tamil Nadu 600061";

function normalizeBusinessAddress(source: string) {
  return source
    .replace(/Office: 4th Main Road, Nanganallur/gi, `Office: ${businessAddress}`)
    .replace(
      /((?:\\)?["']streetAddress(?:\\)?["']\s*:\s*(?:\\)?["'])[^"']*((?:\\)?["'])/gi,
      `$1${businessAddress}$2`,
    )
    .replace(/Nanganallur, Chennai, Tamil Nadu\s*[–-]\s*600061/gi, businessAddress);
}

function addFooterBrand(source: string) {
  return source.replace(
    /(<footer\b[^>]*>)/i,
    '$1<div class="page-footer-brand"><img src="/deeksha-logo.svg" alt="Deeksha — Inspire, Grow, Succeed" /><div class="page-footer-details"><strong>Deeksha Insurance &amp; Financial Services</strong><span>12, 3rd Main Road, NCBS Colony, Nanganallur, Chennai, Tamil Nadu 600061</span><div><a href="https://maps.app.goo.gl/i13s9GxiG2tQ6FDG8" target="_blank" rel="noreferrer">Get directions</a><a href="https://share.google/okfFAiIU7XNvjDLVO" target="_blank" rel="noreferrer">Google Business Profile</a></div></div></div>',
  );
}

function normalizeHomepageSeo(source: string) {
  const headingReplacements: Array<[RegExp, string]> = [
    [/Health Insurance Near Me in Chennai\s*[—-]\s*Trusted Insurance Advisory/i, "Health Insurance in Chennai for Families, Parents & Seniors"],
    [/Securing Today, Protecting Tomorrow/i, "Compare Health Insurance for Your Family, Parents & Senior Citizens"],
    [/Secure Your Family’s Today & Future with Trusted Local Insurance Advisors in Chennai/i, "Top Searched Health, Motor & Life Insurance Plans in Chennai"],
    [/Health Insurance Near Me\s*[—-]\s*Cashless Hospital Cover/i, "Health Insurance Near Me — Fast Cashless Hospital Cover"],
    [/Health Insurance for Family\s*[—-]\s*Comprehensive Floater Plans/i, "Affordable Family Health Insurance Plans in Chennai"],
    [/Health Insurance for family/i, "Compare Family Health Insurance Plans in Chennai"],
    [/Health Insurance for Parents & Senior Citizens \(Ages 60\s*-\s*75\+\)/i, "Health Insurance for Parents & Senior Citizens (Ages 60–75+)"],
    [/Maternity Health Insurance & Newborn Baby Day-1 Shield/i, "Maternity Health Insurance & Newborn Baby Day-1 Shield Cover"],
    [/Comprehensive Motor & Vehicle Insurance Renewal/i, "Comprehensive Motor & Vehicle Insurance Online Renewal"],
    [/Term Life Insurance & Financial Wealth Solutions/i, "Term Life Insurance & Wealth Financial Planning Solutions"],
    [/Instant Cashless Health Insurance & Pre-Authorized Claim Desk/i, "Instant Cashless Health Insurance & Pre-Authorized Claim Desk in Chennai"],
    [/Why South Chennai Chooses Deeksha over Online Aggregator Portals/i, "Why South Chennai Chooses Deeksha Over Online Aggregators"],
    [/Verified Reviews from South Chennai Residents/i, "Verified Reviews from South Chennai & Nanganallur Residents"],
    [/Common Insurance Questions in Chennai/i, "Common Insurance Questions in Chennai (FAQs)"],
    [/Instant Intimation/i, "Step 1: Instant Policy Claim Intimation"],
    [/TPA Pre-Authorization/i, "Step 2: TPA Fast Track Pre-Authorization"],
    [/Cashless Treatment/i, "Step 3: Seamless Cashless Treatment Support"],
    [/Zero-Hassle Settlement/i, "Step 4: Zero-Hassle Final Claim Settlement"],
    [/Family Floater Cashless/i, "Family Floater Cashless Hospitalization Plans"],
    [/Senior Citizens Special/i, "Senior Citizens Special Medical Cover"],
    [/Critical & Super Top-Up/i, "Critical Illness & Super Top-Up Health Insurance"],
    [/Maternity & Newborn/i, "Maternity & Newborn Care Health Policies"],
    [/Health Insurance/i, "Health Insurance Coverage & Cashless Hospitals in Chennai"],
    [/Motor & Financial/i, "Motor Insurance & Financial Wealth Solutions"],
    [/Branch Advisory Office/i, "Nanganallur Branch Advisory Office & Claim Support"],
  ];

  return source.replace(
    /(<h[1-6][^>]*>)([\s\S]*?)(<\/h[1-6]>)/gi,
    (_match, opening, headingText, closing) => {
      const normalizedText = headingReplacements.reduce(
        (result, [pattern, replacement]) => result.replace(pattern, replacement),
        headingText,
      );
      return `${opening}${normalizedText}${closing}`;
    },
  );
}

function normalizePageHeadings(source: string) {
  const headingReplacements: Array<[RegExp, string]> = [
    [/Guiding Chennai Families Toward Complete Financial[\s\S]*?Health Protection/i, "Insurance Guidance for Chennai Families"],
    [/ICICI Two-Wheeler[\s\S]*?Bike Insurance in Chennai[\s\S]*?WhatsApp/i, "Bike and Two-Wheeler Insurance in Chennai"],
    [/ICICI Lombard Car Insurance in Chennai[\s\S]*?Renewal/i, "Car Insurance in Chennai: Cover and Renewal Guidance"],
    [/Visit Our Nanganallur Advisory Desk or Connect Directly/i, "Contact Deeksha Insurance in Nanganallur, Chennai"],
    [/Family Floater Health Insurance in Chennai:[\s\S]*?Room-Rent Caps/i, "Family Health Insurance Plans in Chennai: Compare Your Options"],
    [/Newborn Baby[\s\S]*?Maternity Health Insurance in Chennai/i, "Maternity and Newborn Health Insurance in Chennai"],
    [/ICICI Bank Personal Loans in Chennai[\s\S]*?Advisory/i, "Personal Loan Guidance in Chennai"],
    [/Senior Citizen Health Insurance in Chennai[\s\S]*?75\+/i, "Health Insurance for Senior Citizens and Parents in Chennai"],
    [/Star Health Insurance Specialist Desk in South Chennai[\s\S]*?Claims/i, "Star Health Insurance Guidance in Chennai"],
    [/Term Life Insurance Shield in Chennai[\s\S]*?Crore/i, "Term Life Insurance in Chennai for Family Protection"],
  ];

  return source.replace(/(<h1\b[^>]*>)([\s\S]*?)(<\/h1>)/i, (_match, opening, headingText, closing) => {
    const normalizedText = headingReplacements.reduce(
      (result, [pattern, replacement]) => result.replace(pattern, replacement),
      headingText,
    );
    return `${opening}${normalizedText}${closing}`;
  });
}

function installFaqBehavior() {
  const onFaqClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    const button = target?.closest<HTMLElement>('.faq-toggle, [onclick*="toggleFaq"]');
    if (!button) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const controlledId = button.getAttribute("aria-controls");
    const content = controlledId
      ? document.getElementById(controlledId)
      : button.nextElementSibling?.classList.contains("faq-body")
        ? button.nextElementSibling
        : button.parentElement?.querySelector<HTMLElement>(".faq-body");
    if (!content) return;

    const isOpen = !content.classList.contains("hidden") && content.hidden !== true;
    content.classList.toggle("hidden", isOpen);
    content.hidden = isOpen;
    button.setAttribute("aria-expanded", String(!isOpen));
    button.classList.toggle("is-open", !isOpen);
    button.querySelector<HTMLElement>(".faq-icon, .material-symbols-outlined")?.classList.toggle(
      "rotate-180",
      !isOpen,
    );
  };

  document.addEventListener("click", onFaqClick, true);
  return () => document.removeEventListener("click", onFaqClick, true);
}

export function StaticPage({ html, scripts = [], removeCalculators = false, homepageSeo = false }: StaticPageProps) {
  const content = removeCalculators ? removeCalculatorSections(html) : html;
  const contentWithoutHeader = normalizeBusinessAddress(content).replace(
    /^(?:\s*<!--[\s\S]*?-->\s*)?<header[\s\S]*?<\/header>/i,
    "",
  );
  const normalizedHeadings = homepageSeo
    ? normalizeHomepageSeo(contentWithoutHeader)
    : contentWithoutHeader;
  const pageHtml = markHeroSection(
    normalizePageLayout(
      addFooterBrand(normalizePageHeadings(normalizedHeadings)),
    ),
  );

  useEffect(() => {
    const nodes = (removeCalculators ? [] : scripts).map((code) => {
      const el = document.createElement("script");
      el.textContent = code;
      document.body.appendChild(el);
      return el;
    });
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.page-content-shell main section'));
    sections.forEach((section, index) => {
      section.classList.add("scroll-reveal");
      section.style.setProperty("--reveal-delay", `${Math.min(index * 45, 270)}ms`);
    });
    const removeFaqBehavior = installFaqBehavior();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return () => {
        removeFaqBehavior();
        nodes.forEach((n) => n.remove());
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      removeFaqBehavior();
      nodes.forEach((n) => n.remove());
    };
  }, [removeCalculators, scripts]);

  return <div className="page-content-shell" dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
