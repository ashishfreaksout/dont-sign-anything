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
const defaultBtcAddress = "bc1qy6u2auqdjvw5sk2quk86v69c0cp367q3h5ray0";
const defaultEthAddress = "0x19b9abfBbE0686365445e20984D43A08C566B9bc";
const defaultSolAddress = "DaSzXuM96e87JntboiL1cLCHFU52G4xWYJ2PptXN7x7R";

function BitcoinLogo() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#f7931a" />
      <path
        d="M17 14h9.2c4.4 0 7 2 7 5.2 0 2.2-1.1 3.8-3.1 4.6 2.6.7 4 2.5 4 5.3 0 3.5-2.8 5.9-7.5 5.9H17V14Zm6.2 8h2.3c1.8 0 2.8-.7 2.8-2s-1-2-2.8-2h-2.3v4Zm0 9h2.9c1.9 0 3-.8 3-2.4s-1.1-2.4-3-2.4h-2.9V31Z"
        fill="#fff"
      />
      <path d="M20.6 10v5.5M25.6 10v5.5M20.6 32.5V38M25.6 32.5V38" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function EthereumLogo() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#eef2ff" />
      <path d="M24 7 12.5 25.5 24 20.2l11.5 5.3L24 7Z" fill="#627eea" />
      <path d="M24 20.2 12.5 25.5 24 32.3l11.5-6.8L24 20.2Z" fill="#8a9af5" />
      <path d="M12.5 28.3 24 41l11.5-12.7L24 35.1l-11.5-6.8Z" fill="#627eea" />
      <path d="M24 7v13.2l11.5 5.3L24 7ZM24 32.3V41l11.5-12.7L24 35.1v-2.8Z" fill="#3544a0" opacity="0.65" />
    </svg>
  );
}

function SolanaLogo() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#111827" />
      <defs>
        <linearGradient id="solanaLogoGradient" x1="11" y1="11" x2="37" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14f195" />
          <stop offset="0.5" stopColor="#80ecff" />
          <stop offset="1" stopColor="#dc1fff" />
        </linearGradient>
      </defs>
      <path d="M15.2 14h21.2l-3.6 4H11.6l3.6-4Z" fill="url(#solanaLogoGradient)" />
      <path d="M11.6 22h21.2l3.6 4H15.2l-3.6-4Z" fill="url(#solanaLogoGradient)" />
      <path d="M15.2 30h21.2l-3.6 4H11.6l3.6-4Z" fill="url(#solanaLogoGradient)" />
    </svg>
  );
}

const cryptoWallets = [
  {
    id: "btc",
    name: "Bitcoin",
    asset: "BTC",
    Logo: BitcoinLogo,
    network: "Bitcoin network",
    address: import.meta.env.VITE_BTC_ADDRESS || defaultBtcAddress,
    uriPrefix: "bitcoin",
    warning: "Send BTC only on the Bitcoin network.",
  },
  {
    id: "eth",
    name: "Ethereum",
    asset: "ETH",
    Logo: EthereumLogo,
    network: "Ethereum mainnet",
    address: import.meta.env.VITE_ETH_ADDRESS || defaultEthAddress,
    uriPrefix: "ethereum",
    warning: "Send ETH only on Ethereum mainnet unless you confirm another network first.",
  },
  {
    id: "sol",
    name: "Solana",
    asset: "SOL",
    Logo: SolanaLogo,
    network: "Solana network",
    address: import.meta.env.VITE_SOL_ADDRESS || defaultSolAddress,
    uriPrefix: "solana",
    warning: "Send SOL only on the Solana network.",
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
            const Logo = wallet.Logo;
            return (
              <article key={wallet.id} className="scroll-reveal surface-card p-6 md:p-7" data-scroll-reveal>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="icon-tile flex h-14 w-14 flex-none items-center justify-center">
                      <Logo />
                    </div>
                    <div>
                      <p className="text-base font-bold uppercase text-teal-700">{wallet.asset}</p>
                      <h2 className="mt-1 text-2xl font-bold text-slate-950">{wallet.name}</h2>
                      <p className="mt-1 text-base font-semibold text-slate-500">{wallet.network}</p>
                    </div>
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
                      {wallet.id === "btc"
                        ? "VITE_BTC_ADDRESS"
                        : wallet.id === "eth"
                          ? "VITE_ETH_ADDRESS"
                          : "VITE_SOL_ADDRESS"}
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
