import React, { useState } from 'react';
import { Star, Search, ShieldCheck } from 'lucide-react';
import { PROS_LIST } from './ContractorsDirectoryData';

export default function ContractorsDirectory({ onOpenPostJob }) {
  const [tradeFilter, setTradeFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredPros = PROS_LIST.filter((pro) => {
    const matchesTrade = tradeFilter === 'All' || pro.trade === tradeFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      !query ||
      pro.name.toLowerCase().includes(query) ||
      pro.trade.toLowerCase().includes(query) ||
      pro.specialties.some((s) => s.toLowerCase().includes(query));

    return matchesTrade && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Verified Contractors Directory</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Browse licensed electricians, plumbers, and handymen participating in Wrench reverse-bidding.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="clay-card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pros by name, specialty, or trade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 clay-input text-xs font-semibold text-slate-800 placeholder-slate-400"
          />
        </div>

        <select
          value={tradeFilter}
          onChange={(e) => setTradeFilter(e.target.value)}
          className="px-4 py-2.5 clay-input text-xs font-black text-slate-800"
        >
          <option value="All">All Trades</option>
          <option value="Electrician">Electricians</option>
          <option value="Plumber">Plumbers</option>
          <option value="Handyman">Handymen</option>
          <option value="HVAC Tech">HVAC Techs</option>
        </select>
      </div>

      {/* Pros Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPros.map((pro) => (
          <div
            key={pro.id}
            className="clay-card clay-card-hover p-6 bg-white space-y-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={pro.avatar}
                alt={pro.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
              />
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">{pro.name}</h3>
                  <span className="text-emerald-700 font-mono font-black text-sm">${pro.hourlyRate}/hr</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider clay-surface-indigo text-indigo-950">
                    {pro.trade}
                  </span>
                  <span className="text-slate-500 font-bold">{pro.license}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{pro.rating}</span>
                  <span className="text-slate-400">({pro.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-100 p-3.5 rounded-2xl border border-slate-200">
              {pro.bio}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {pro.specialties.map((spec) => (
                <span key={spec} className="px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-xl text-[11px]">
                  {spec}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-end">
              <button
                onClick={onOpenPostJob}
                className="clay-button-primary px-4 py-2 text-xs"
              >
                Request Bid From Pro
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
