import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

type Item = { to: string; label: string; desc: string; icon: string };
type Group = { id: string; label: string; items: Item[] };

const groups: Group[] = [
  {
    id: "health",
    label: "Health Insurance",
    items: [
      {
        to: "/",
        label: "Cashless Health Insurance",
        desc: "14,000+ network hospitals across India",
        icon: "local_hospital",
      },
      {
        to: "/family-floater-health-insurance",
        label: "Family Floater Health Plans",
        desc: "One policy that covers the whole family",
        icon: "family_restroom",
      },
      {
        to: "/senior-citizen-health-insurance",
        label: "Parents & Senior Citizens",
        desc: "Plans built for age 60+ with quick issuance",
        icon: "elderly",
      },
      {
        to: "/maternity-newborn-insurance",
        label: "New Born Baby & Maternity",
        desc: "Delivery, newborn and vaccination cover",
        icon: "child_friendly",
      },
      {
        to: "/star-health-insurance",
        label: "Star Health Specialist Desk",
        desc: "Dedicated Nanganallur specialist desk",
        icon: "workspace_premium",
      },
    ],
  },
  {
    id: "motor",
    label: "Motor Insurance",
    items: [
      {
        to: "/car-insurance",
        label: "ICICI Car Insurance",
        desc: "Zero depreciation & fast renewal",
        icon: "directions_car",
      },
      {
        to: "/bike-insurance",
        label: "ICICI Two-Wheeler / Bike Insurance",
        desc: "Instant policy for scooters & bikes",
        icon: "two_wheeler",
      },
    ],
  },
  {
    id: "loans",
    label: "Loans & Life",
    items: [
      {
        to: "/personal-loan",
        label: "ICICI Bank Personal Loans",
        desc: "Instant approval, minimal paperwork",
        icon: "account_balance",
      },
      {
        to: "/term-life-insurance",
        label: "Term Life Insurance Shield",
        desc: "High cover at a low yearly premium",
        icon: "shield_person",
      },
    ],
  },
];

export function SiteNav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>("health");
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActiveGroup = (g: Group) => g.items.some((i) => i.to === pathname && i.to !== "/");

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 w-full">
      {/* Top utility bar */}
      <div className="site-utility-bar w-full border-b border-[#D4AF37]/30 bg-[#071933] text-white">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-[11px] font-medium sm:text-xs lg:px-8">
          <a
            className="flex min-w-0 items-center gap-1 text-slate-200 transition-colors hover:text-white"
            href="https://maps.app.goo.gl/i13s9GxiG2tQ6FDG8"
            target="_blank"
            rel="noreferrer"
            aria-label="Directions to Deeksha Insurance, 12, 3rd Main Road, NCBS Colony, Nanganallur, Chennai"
          >
            <span className="material-symbols-outlined shrink-0 text-[15px] text-[#D4AF37]">
              location_on
            </span>
            <span className="truncate">
              12, 3rd Main Rd, NCBS Colony, Nanganallur, Chennai 600061
            </span>
          </a>
          <div className="flex items-center gap-3 text-slate-300">
            <a
              className="flex items-center gap-1 transition-colors hover:text-[#D4AF37]"
              href="tel:+916374423164"
            >
              <span className="material-symbols-outlined shrink-0 text-[15px] text-[#D4AF37]">
                call
              </span>
              +91 63744 23164
            </a>
            <a
              className="hidden items-center gap-1 transition-colors hover:text-white sm:flex"
              href="mailto:info@deekshainsure.in"
            >
              <span className="material-symbols-outlined text-[15px]">mail</span>
              info@deekshainsure.in
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        ref={navRef}
        className="site-main-nav w-full border-b border-[#D4AF37]/20 bg-white/98 backdrop-blur-md"
      >
        <div className="mx-auto grid h-[72px] max-w-[1280px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 lg:px-8">
          <Link
            to="/"
            aria-label="Deeksha Insurance & Financial Services home"
            className="site-brand group flex min-w-0 items-center gap-3"
          >
            <img
              src="/deeksha-logo.svg"
              alt="Deeksha — Inspire, Grow, Succeed"
              className="h-[54px] w-[210px] max-w-full object-contain object-left"
            />
          </Link>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-[#0D2C54] transition-colors hover:bg-[#0D2C54]/5 hover:text-[#B08D2A] [&.active]:text-[#B08D2A]"
              activeOptions={{ exact: true }}
            >
              Home
            </Link>

            {groups.map((g) => (
              <div
                key={g.id}
                className="static xl:relative"
                onMouseEnter={() => setOpen(g.id)}
                onMouseLeave={() => setOpen((o) => (o === g.id ? null : o))}
              >
                <button
                  type="button"
                  aria-expanded={open === g.id}
                  aria-haspopup="true"
                  onClick={() => setOpen((o) => (o === g.id ? null : g.id))}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#0D2C54]/5 ${
                    open === g.id || isActiveGroup(g) ? "text-[#B08D2A]" : "text-[#0D2C54]"
                  }`}
                >
                  {g.label}
                  <span
                    className={`material-symbols-outlined text-[18px] transition-transform ${
                      open === g.id ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {open === g.id && (
                  <div
                    className={`absolute left-1/2 top-full z-50 w-[min(680px,calc(100vw-3rem))] -translate-x-1/2 border-t-8 border-transparent bg-transparent pb-2 xl:left-0 xl:translate-x-0 ${
                      g.items.length > 2 ? "xl:w-[640px]" : "xl:w-[420px]"
                    }`}
                  >
                    <ul
                      className={`grid gap-1 rounded-2xl border border-[#D4AF37]/25 bg-white p-3 shadow-[0_24px_60px_rgba(13,44,84,0.18)] ${g.items.length > 2 ? "sm:grid-cols-2" : ""}`}
                    >
                      {g.items.map((it) => (
                        <li key={it.label}>
                          <Link
                            to={it.to}
                            className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#F7F3E8]"
                          >
                            <span className="material-symbols-outlined mt-0.5 shrink-0 rounded-lg bg-[#0D2C54]/5 p-1.5 text-[20px] text-[#B08D2A]">
                              {it.icon}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-bold text-[#0D2C54]">
                                {it.label}
                              </span>
                              <span className="block text-xs text-slate-500">{it.desc}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/about"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-[#0D2C54] transition-colors hover:bg-[#0D2C54]/5 hover:text-[#B08D2A]"
            >
              About Us
            </Link>

            <a
              href="tel:+916374423164"
              className="ml-2 flex items-center gap-1 rounded-lg border border-[#D4AF37] px-3 py-2 text-sm font-bold text-[#0D2C54]"
            >
              <span className="material-symbols-outlined text-[17px]">call</span>
              6374423164
            </a>
            <a
              href="https://wa.me/916374423164?text=Hello%20Deeksha%20Insurance%2C%20I%20need%20a%20quote."
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-[#1B5E20] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#124517]"
            >
              Get WhatsApp Quote
            </a>
          </nav>

          <div className="site-mobile-actions flex items-center gap-2 xl:hidden">
            <a
              href="tel:+916374423164"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D2C54] text-white sm:hidden"
              aria-label="Call Deeksha Insurance and Financial Services"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0D2C54]/15 text-[#0D2C54]"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <div
            className="absolute inset-0 bg-[#071933]/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="site-mobile-drawer absolute right-0 top-0 flex h-full w-[min(360px,88vw)] flex-col overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <span className="text-base font-extrabold text-[#0D2C54]">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-[#0D2C54]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col gap-1 p-3">
              <Link
                to="/"
                className="rounded-xl px-3 py-3 text-sm font-bold text-[#0D2C54] hover:bg-slate-50"
              >
                Home
              </Link>

              {groups.map((g) => (
                <div key={g.id} className="rounded-xl border border-slate-100">
                  <button
                    type="button"
                    aria-expanded={mobileGroup === g.id}
                    onClick={() => setMobileGroup((m) => (m === g.id ? null : g.id))}
                    className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left text-sm font-bold text-[#0D2C54]"
                  >
                    {g.label}
                    <span
                      className={`material-symbols-outlined shrink-0 text-[20px] text-[#B08D2A] transition-transform ${
                        mobileGroup === g.id ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {mobileGroup === g.id && (
                    <ul className="border-t border-slate-100 p-1">
                      {g.items.map((it) => (
                        <li key={it.label}>
                          <Link
                            to={it.to}
                            className="flex items-start gap-3 rounded-lg p-3 hover:bg-[#F7F3E8]"
                          >
                            <span className="material-symbols-outlined mt-0.5 shrink-0 text-[19px] text-[#B08D2A]">
                              {it.icon}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[13px] font-semibold text-[#0D2C54]">
                                {it.label}
                              </span>
                              <span className="block text-[11px] text-slate-500">{it.desc}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <Link
                to="/about"
                className="rounded-xl px-3 py-3 text-sm font-bold text-[#0D2C54] hover:bg-slate-50"
              >
                About Us
              </Link>

              <a
                href="tel:+916374423164"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0D2C54] px-4 py-3 text-sm font-bold text-white"
              >
                <span className="material-symbols-outlined text-[19px]">call</span>
                Call +91 63744 23164
              </a>
              <a
                href="https://wa.me/916374423164?text=Hello%20Deeksha%20Insurance%2C%20I%20need%20a%20quote."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#1B5E20] px-4 py-3 text-sm font-bold text-white"
              >
                <span className="material-symbols-outlined text-[19px]">chat</span>
                Get WhatsApp Quote
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
