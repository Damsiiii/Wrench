import React from 'react';
import { PlusCircle, TrendingDown, Scale, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onOpenPostJob, onOpenMarketGuide }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full clay-surface-indigo text-indigo-950 text-xs font-black uppercase tracking-wider">
          How Wrench Works
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Reverse Bids + Price Reasonableness Standards
        </h1>
        <p className="text-slate-600 text-sm font-medium leading-relaxed">
          Wrench eliminates mystery pricing from home repairs. Homeowners post tasks; licensed contractors submit itemized bids benchmarked against regional trade averages.
        </p>
      </div>

      {/* 3 Step Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="clay-card p-6 space-y-4 bg-white relative">
          <div className="w-12 h-12 rounded-2xl clay-surface-indigo font-black text-xl flex items-center justify-center text-indigo-950">
            1
          </div>
          <h3 className="text-lg font-black text-slate-900">Post Your Job & Target Budget</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Describe your repair or installation task (electrical, plumbing, handyman, HVAC). Set a target budget or let contractors inspect the scope.
          </p>
        </div>

        <div className="clay-card p-6 space-y-4 bg-white relative">
          <div className="w-12 h-12 rounded-2xl clay-surface-amber font-black text-xl flex items-center justify-center text-amber-950">
            2
          </div>
          <h3 className="text-lg font-black text-slate-900">Receive Itemized Contractor Bids</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Verified licensed contractors submit bids breaking down estimated labor hours, parts/materials, callout fees, and start times.
          </p>
        </div>

        <div className="clay-card p-6 space-y-4 bg-white relative">
          <div className="w-12 h-12 rounded-2xl clay-surface-emerald font-black text-xl flex items-center justify-center text-emerald-950">
            3
          </div>
          <h3 className="text-lg font-black text-slate-900">Compare Benchmarks & Hire</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Cross-reference bids with our Average Price Guide to understand why a price is fair (NEC compliance, specialized equipment, EPA standards) before accepting.
          </p>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="clay-card clay-surface-indigo p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-indigo-950">
          <h3 className="text-2xl font-black">Ready to post your first task?</h3>
          <p className="text-xs font-bold text-indigo-900">Join thousands of homeowners saving 18% - 32% on licensed trade services.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPostJob}
            className="clay-button-primary px-6 py-3.5 text-xs"
          >
            Post Job For Bids
          </button>
          <button
            onClick={onOpenMarketGuide}
            className="clay-button-secondary px-6 py-3.5 text-xs font-bold"
          >
            Explore Price Guide
          </button>
        </div>
      </div>

    </div>
  );
}
