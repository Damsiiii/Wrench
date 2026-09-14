import React from 'react';
import { PlusCircle, Scale, ShieldCheck, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HeroSection({ onOpenPostJob, onOpenMarketGuide }) {
  return (
    <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800 text-white">
      {/* Visual Accent Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Main Headline & Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-indigo-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Transparent Home Services Marketplace</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Post Your Job. <br />
              <span className="bg-gradient-to-r from-amber-400 via-indigo-300 to-indigo-400 bg-clip-text text-transparent">
                Pros Bid. You Compare Fair Rates.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Never overpay or guess contractor fees again. Post your electrical, plumbing, or handyman task, receive competitive bids with itemized labor/part breakdowns, and compare against localized market averages with instant price explanations.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenPostJob}
                className="px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center gap-2.5 transition-all hover:scale-[1.02]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Job & Receive Bids</span>
              </button>

              <button
                onClick={onOpenMarketGuide}
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm rounded-2xl flex items-center gap-2 transition-colors"
              >
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Explore Average Rates</span>
              </button>
            </div>
          </div>

          {/* Market Insight Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-3 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Why Reverse Bidding?</span>
                <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Save 18% - 32%
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Licensed contractors compete for your job by breaking down labor hours, materials, and callout fees so you see exactly what you are paying for.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-800/40 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <DollarSign className="w-4 h-4" />
                <span>Price Reasonableness Engine</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every bid is cross-referenced with National Electrical Code (NEC), EPA standards, and material cost benchmarks to explain why a price is fair.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
