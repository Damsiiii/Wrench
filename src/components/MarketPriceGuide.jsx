import React, { useState } from 'react';
import { X, Scale, Info, CheckCircle, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { MARKET_BENCHMARKS } from '../data/mockData';

export default function MarketPriceGuide({ isOpen, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Electrician', 'Plumber', 'Handyman', 'HVAC Tech', 'Painter', 'Locksmith'];

  const filteredBenchmarks = selectedCategory === 'All'
    ? MARKET_BENCHMARKS
    : MARKET_BENCHMARKS.filter((b) => b.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Average Market Price & Reasonableness Guide</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Current local rate benchmarks and cost factor explanations to guide fair bidding.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-900/50 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Modal Body / Benchmarks List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {filteredBenchmarks.map((bm) => (
            <div
              key={bm.id}
              className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 hover:border-slate-600 transition-colors space-y-4"
            >
              {/* Task Header & Price Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/50">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {bm.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">{bm.taskName}</h3>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    ${bm.avgPrice}
                    <span className="text-xs font-normal text-slate-400"> / {bm.unit} avg</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Typical Range: ${bm.priceRange[0]} – ${bm.priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Itemized Cost Breakdown Grid */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Average Cost Distribution</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {Object.entries(bm.breakdown).map(([key, val]) => (
                    <div key={key} className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-xs">
                      <div className="text-slate-400 font-medium capitalize">{key.replace(/([AZ])/g, ' $1')}</div>
                      <div className="text-amber-300 font-bold mt-0.5">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why This Price Is Reasonable */}
              <div className="bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <HelpCircle className="w-4 h-4" />
                  <span>Why Is This Price Reasonable?</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {bm.whyReasonable}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Close Market Guide
          </button>
        </div>

      </div>
    </div>
  );
}
