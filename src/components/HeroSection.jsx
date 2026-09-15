import React from 'react';
import { PlusCircle, Scale, ShieldCheck, DollarSign, Sparkles } from 'lucide-react';

export default function HeroSection({ onOpenPostJob, onOpenMarketGuide }) {
  return (
    <div className="relative overflow-hidden bg-slate-100 border-b-2 border-slate-200 py-12 md:py-16 text-slate-900">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Main Headline & Clay Banner */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl clay-surface-emerald text-emerald-950 text-xs font-black">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Volumetric Reverse-Bidding & Fair-Price Guarantee</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Post Your Job. <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
                Pros Bid. You Compare Fair Rates.
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
              Never overpay or guess contractor fees again. Post your electrical, plumbing, or handyman task, receive competitive bids with itemized labor/part breakdowns, and compare against localized market averages with instant price explanations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenPostJob}
                className="clay-button-primary px-6 py-3.5 text-sm flex items-center gap-2.5"
              >
                <PlusCircle className="w-5 h-5 stroke-[2.5]" />
                <span>Post Job & Receive Bids</span>
              </button>

              <button
                onClick={onOpenMarketGuide}
                className="clay-button-secondary px-6 py-3.5 text-sm flex items-center gap-2.5"
              >
                <Scale className="w-5 h-5 text-amber-600" />
                <span>Explore Average Rates</span>
              </button>
            </div>
          </div>

          {/* Claymorphic Insight Volumetric Tiles */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-5">
            <div className="clay-card clay-surface-sky p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-sky-900">Why Reverse Bidding?</span>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-white/90 text-emerald-700 shadow-sm">
                  Save 18% - 32%
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Licensed contractors compete for your job by breaking down labor hours, materials, and callout fees so you see exactly what you are paying for.
              </p>
            </div>

            <div className="clay-card clay-surface-amber p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-950 text-xs font-black uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-amber-700" />
                <span>Price Reasonableness Engine</span>
              </div>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                Every bid is cross-referenced with National Electrical Code (NEC), EPA standards, and material cost benchmarks to explain why a price is fair.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
