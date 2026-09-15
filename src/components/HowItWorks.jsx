import React from 'react';
import { PlusCircle, TrendingDown, Scale, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onOpenPostJob, onOpenMarketGuide }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider">
          How Wrench Works
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          Reverse Bids + Price Reasonableness Standards
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Wrench eliminates mystery pricing from home repairs. Homeowners post tasks; licensed contractors submit itemized bids benchmarked against regional trade averages.
        </p>
      </div>

      {/* 3 Step Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 relative">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
            1
          </div>
          <h3 className="text-lg font-bold text-white">Post Your Job & Target Budget</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Describe your repair or installation task (electrical, plumbing, handyman, HVAC). Set a target budget or let contractors inspect the scope.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 relative">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center">
            2
          </div>
          <h3 className="text-lg font-bold text-white">Receive Itemized Contractor Bids</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Verified licensed contractors submit bids breaking down estimated labor hours, parts/materials, callout fees, and start times.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 relative">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white font-black text-lg flex items-center justify-center">
            3
          </div>
          <h3 className="text-lg font-bold text-white">Compare Benchmarks & Hire</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Cross-reference bids with our Average Price Guide to understand why a price is fair (NEC compliance, specialized equipment, EPA standards) before accepting.
          </p>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 border border-indigo-800/50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-white">Ready to post your first task?</h3>
          <p className="text-xs text-slate-400">Join thousands of homeowners saving 18% - 32% on licensed trade services.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPostJob}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/20"
          >
            Post Job For Bids
          </button>
          <button
            onClick={onOpenMarketGuide}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700"
          >
            Explore Price Guide
          </button>
        </div>
      </div>

    </div>
  );
}
