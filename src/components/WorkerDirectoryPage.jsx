import React, { useState } from 'react';
import {
  MapPin,
  Wrench,
  Search,
  Star,
  ArrowRight,
  Megaphone,
  ChevronDown
} from 'lucide-react';
import { TOWNS, INITIAL_WORKERS } from '../data/mockData';

export default function WorkerDirectoryPage({
  onSelectWorker,
  onOpenPostJob
}) {
  const [selectedTown, setSelectedTown] = useState('Kurunegala');
  const [selectedTrade, setSelectedTrade] = useState('All trades');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('highest_rated');

  const filteredWorkers = INITIAL_WORKERS.filter((worker) => {
    if (selectedTown !== 'All' && worker.town !== selectedTown) {
      if (!searchQuery) return false;
    }
    if (selectedTrade !== 'All trades') {
      if (!worker.trade.toLowerCase().includes(selectedTrade.toLowerCase())) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = worker.name.toLowerCase().includes(q);
      const matchTrade = worker.trade.toLowerCase().includes(q);
      const matchDesc = worker.shortDesc?.toLowerCase().includes(q) || false;
      if (!matchName && !matchTrade && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Section: Title Left & Post Job Callout Right */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Find a worker</h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Skilled and trusted local workers for your home and property.
          </p>
        </div>

        {/* Promo Banner Card (Mint Background) */}
        <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-800 shadow-sm flex-shrink-0">
              <Megaphone className="w-5 h-5 text-slate-800" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">Need something done?</h3>
              <p className="text-[11px] text-slate-600">Post a job and get quotes from local workers.</p>
            </div>
          </div>

          <button onClick={onOpenPostJob} className="btn-primary text-xs sm:text-sm px-4 py-2 flex-shrink-0">
            <span>Post a job</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Town Select */}
        <div className="relative w-full sm:w-52">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
            <MapPin className="w-4 h-4" />
          </div>
          <select
            value={selectedTown}
            onChange={(e) => setSelectedTown(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008272] appearance-none"
          >
            {TOWNS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Trade Select */}
        <div className="relative w-full sm:w-52">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
            <Wrench className="w-4 h-4" />
          </div>
          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008272] appearance-none"
          >
            <option value="All trades">All trades</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting & decorating</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Cleaning">Cleaning & housekeeping</option>
            <option value="Masonry">Masonry</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Keyword Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, trade or keyword (e.g. plumbing, painting...)"
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008272]"
          />
        </div>

        {/* Search CTA */}
        <button className="bg-[#008272] hover:bg-[#007163] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-colors shadow-sm">
          Search
        </button>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          {filteredWorkers.length} workers found in {selectedTown}
        </h2>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span>Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
          >
            <option value="highest_rated">Highest rated</option>
            <option value="most_reviews">Most reviews</option>
          </select>
        </div>
      </div>

      {/* Workers Grid (3 columns matching Board 10) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-slate-300 transition-all"
          >
            <div className="flex items-start gap-4">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-20 h-20 rounded-xl object-cover border border-slate-100 flex-shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <h3 className="text-base font-bold text-slate-900 truncate">{worker.name}</h3>
                <div className="text-xs text-slate-600 font-medium">{worker.trade}</div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{worker.town}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 pt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{worker.rating}</span>
                  <span className="text-slate-400 font-normal">({worker.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {worker.shortDesc || worker.about}
            </p>

            <button
              onClick={() => onSelectWorker(worker.id)}
              className="w-full bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <span>View profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
