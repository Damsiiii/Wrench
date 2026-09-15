import React, { useState } from 'react';
import { X, Scale, HelpCircle } from 'lucide-react';
import { MARKET_BENCHMARKS } from '../data/mockData';

export default function MarketPriceGuide({ isOpen, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Electrician', 'Plumber', 'Handyman', 'HVAC Tech', 'Painter', 'Locksmith'];

  const filteredBenchmarks = selectedCategory === 'All'
    ? MARKET_BENCHMARKS
    : MARKET_BENCHMARKS.filter((b) => b.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div className="clay-card bg-slate-50 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto border-2 border-white text-slate-900">

        {/* Modal Header */}
        <div className="p-6 border-b-2 border-slate-200/80 flex items-center justify-between bg-slate-100/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl clay-surface-amber flex items-center justify-center text-amber-900">
              <Scale className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Average Market Price & Reasonableness Guide</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Current local rate benchmarks and cost factor explanations to guide fair bidding.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 transition-colors"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-3 border-b border-slate-200/80 bg-slate-100/50 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                selectedCategory === cat
                  ? 'clay-surface-indigo text-indigo-950 font-black'
                  : 'clay-button-secondary text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Benchmarks List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {filteredBenchmarks.map((bm) => (
            <div
              key={bm.id}
              className="clay-card p-5 space-y-4 bg-white"
            >
              {/* Task Header & Price Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl clay-surface-indigo text-indigo-950">
                    {bm.category}
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-2">{bm.taskName}</h3>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-2xl font-black text-emerald-600 font-mono">
                    ${bm.avgPrice}
                    <span className="text-xs font-bold text-slate-500"> / {bm.unit} avg</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5">
                    Typical Range: ${bm.priceRange[0]} – ${bm.priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Cost Distribution */}
              <div>
                <h4 className="text-xs font-black text-slate-700 mb-2 uppercase tracking-wider">Average Cost Distribution</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(bm.breakdown).map(([key, val]) => (
                    <div key={key} className="clay-card bg-slate-50 p-3 text-xs">
                      <div className="text-slate-500 font-bold capitalize">{key.replace(/([AZ])/g, ' $1')}</div>
                      <div className="text-amber-800 font-black text-sm mt-0.5">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why This Price Is Reasonable */}
              <div className="clay-surface-sky p-4 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-sky-950">
                  <HelpCircle className="w-4 h-4 text-sky-700" />
                  <span>Why Is This Price Reasonable?</span>
                </div>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {bm.whyReasonable}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t-2 border-slate-200/80 bg-slate-100/90 flex justify-end">
          <button
            onClick={onClose}
            className="clay-button-secondary px-5 py-2 text-xs font-bold"
          >
            Close Price Guide
          </button>
        </div>

      </div>
    </div>
  );
}
