import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Github,
  HeartHandshake,
  Server,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

import BrandLogo from "../components/BrandLogo.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

const githubRepoUrl = "https://github.com/ashishfreaksout/dont-sign-anything";
const cryptoWallets = [
  {
    id: "btc",
    name: "Bitcoin",
    asset: "BTC",
    network: "Bitcoin network",
    address: import.meta.env.VITE_BTC_ADDRESS || "",
    uriPrefix: "bitcoin",
    warning: "Send BTC only on the Bitcoin network.",
  },
  {
    id: "eth",
    name: "Ethereum",
    asset: "ETH",
    network: "Ethereum mainnet",
    address: import.meta.env.VITE_ETH_ADDRESS || "",
    uriPrefix: "ethereum",
    warning: "Send ETH only on Ethereum mainnet unless you confirm another network first.",
  },
];

const supportItems = [
  {
    title: "Keep the demo online",
    description: "Helps cover small hosting costs for the public web app and API.",
    icon: Server,
  },
  {
    title: "Improve plain-English checks",
    description: "Supports more examples, clearer explanations, and better review patterns.",
    icon: Sparkles,
  },
  {
    title: "Keep access open",
    description: "The core document review flow stays free and does not move behind a paywall.",
    icon: ShieldCheck,
  },
];

export default function SupportPage({ hasAnalysis, onBack, onOpenSupport }) {
  const [copiedWallet, setCopiedWallet] = useState("");
  useScrollReveal([]);

  async function handleCopy(wallet) {
    if (!wallet.address) {
      return;
    }

    try {
      await navigator.clipboard.writeText(wallet.address);
      setCopiedWallet(wallet.id);
      window.setTimeout(() => setCopiedWallet(""), 1800);
    } catch {
      setCopiedWallet(`${wallet.id}-failed`);
      window.setTimeout(() => setCopiedWallet(""), 2400);
    }
  }

  return (
    <div className="page-shell min-h-screen">
      <header className="app-header sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo />
            <div>
              <p className="text-base font-bold text-slate-950">Don't Sign Anything!</p>
              <p className="text-sm text-slate-500">Support the project</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="secondary-action inline-flex h-11 items-center justify-center gap-2 px-4 text-base font-bold text-slate-800 transition"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {hasAnalysis ? "Back to report" : "Back to review"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-12">
        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="scroll-reveal" data-scroll-reveal>
            <div className="eyebrow-pill inline-flex items-center gap-2 px-4 py-2 text-base font-bold">
              <HeartHandshake className="h-5 w-5 text-teal-700" aria-hidden="true" />
              Voluntary support
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight text-slate-950 sm:text-6xl">
              Support the project without locking anything away.
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-600">
              Donations are optional. They do not unlock special results, faster scoring, or
              hidden features. Crypto tips are just a simple way to support the project while it
              grows.
            </p>
          </div>

          <aside className="scroll-reveal surface-card p-6 md:p-7" data-scroll-reveal>
            <div className="metric-icon flex h-14 w-14 items-center justify-center text-teal-700">
              <Wallet className="h-7 w-7" aria-hidden="true" />
            </div>
            <p className="mt-6 text-base font-bold uppercase text-teal-700">
              Crypto tips
            </p>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-950">
              Send a small tip directly to the project wallet.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Use the listed network exactly. Crypto transfers are usually not reversible, so check
              the address and network before sending.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noreferrer"
                className="secondary-action inline-flex h-12 items-center justify-center gap-2 px-5 text-base font-bold text-slate-800 transition"
              >
                <Github className="h-5 w-5 text-teal-700" aria-hidden="true" />
                View source
              </a>
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          {cryptoWallets.map((wallet) => {
            const copied = copiedWallet === wallet.id;
            const copyFailed = copiedWallet === `${wallet.id}-failed`;
            return (
              <article key={wallet.id} className="scroll-reveal surface-card p-6 md:p-7" data-scroll-reveal>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-bold uppercase text-teal-700">{wallet.asset}</p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-950">{wallet.name}</h2>
                    <p className="mt-1 text-base font-semibold text-slate-500">{wallet.network}</p>
                  </div>
                  <div className="icon-tile flex h-12 w-12 items-center justify-center text-teal-700">
                    <Wallet className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>

                {wallet.address ? (
                  <>
                    <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-bold uppercase text-slate-500">Receiver address</p>
                      <code className="mt-2 block break-all text-base font-bold leading-7 text-slate-950">
                        {wallet.address}
                      </code>
                    </div>
                    <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-base font-semibold leading-7 text-amber-900">
                      {wallet.warning}
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => handleCopy(wallet)}
                        className="primary-action inline-flex h-12 items-center justify-center gap-2 px-5 text-base font-bold text-white transition"
                      >
                        {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
                        {copied ? "Copied" : "Copy address"}
                      </button>
                      <a
                        href={`${wallet.uriPrefix}:${wallet.address}`}
                        className="secondary-action inline-flex h-12 items-center justify-center gap-2 px-5 text-base font-bold text-slate-800 transition"
                      >
                        Open wallet
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                    {copyFailed && (
                      <p className="mt-3 text-base font-semibold text-red-700">
                        Copy failed. Select and copy the address manually.
                      </p>
                    )}
                  </>
                ) : (
                  <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-base leading-7 text-slate-600">
                    Add a GitHub Pages variable named{" "}
                    <code className="font-bold text-slate-950">
                      {wallet.id === "btc" ? "VITE_BTC_ADDRESS" : "VITE_ETH_ADDRESS"}
                    </code>{" "}
                    to show this wallet.
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {supportItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="scroll-reveal surface-card p-6" data-scroll-reveal>
                <div className="icon-tile flex h-12 w-12 items-center justify-center text-teal-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-slate-950">{item.title}</h2>
                <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </section>

        <section className="scroll-reveal surface-card mt-8 p-6 md:p-7" data-scroll-reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-base font-bold uppercase text-teal-700">Still free to use</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">No membership. No paywall.</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                Support is separate from the document review flow. Everyone sees the same risk
                explanations, summaries, questions, and non-legal-advice disclaimer.
              </p>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="primary-action inline-flex h-12 items-center justify-center gap-2 px-5 text-base font-bold text-white transition"
            >
              Review a document
            </button>
          </div>
        </section>
      </main>

      <SiteFooter onOpenSupport={onOpenSupport} />
    </div>
  );
}
