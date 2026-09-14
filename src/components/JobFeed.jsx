import React, { useState } from 'react';
import {
  Layers,
  Search,
  Filter,
  DollarSign,
  Clock,
  MapPin,
  TrendingDown,
  CheckCircle2,
  HardHat,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  Award
} from 'lucide-react';

export default function JobFeed({
  jobs,
  userRole,
  onSelectJob,
  onOpenPlaceBidModal,
  selectedCategory,
  setSelectedCategory
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyUrgent, setOnlyUrgent] = useState(false);

  const categories = ['All', 'Electrician', 'Plumber', 'Handyman', 'HVAC Tech', 'Painter', 'Locksmith'];

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesUrgent = !onlyUrgent || job.urgent;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query);

    return matchesCategory && matchesUrgent && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search jobs by keyword, location, or trade (e.g., panel upgrade, Austin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOnlyUrgent(!onlyUrgent)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                onlyUrgent
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-slate-800 text-slate-300 border border-slate-700/60 hover:bg-slate-700'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Urgent / Same-Day Only</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                  : 'bg-slate-800 text-slate-400 border border-slate-700/50 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Feed Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-bold text-slate-300 uppercase tracking-wider">
            Open Jobs Receiving Bids ({filteredJobs.length})
          </span>
          <span>Click any job card to inspect current contractor bids</span>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => {
              const lowestBid = job.bids.length > 0
                ? Math.min(...job.bids.map((b) => b.amount))
                : null;

              return (
                <div
                  key={job.id}
                  onClick={() => onSelectJob(job)}
                  className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 shadow-xl transition-all hover:shadow-indigo-500/5 cursor-pointer group flex flex-col justify-between space-y-4"
                >
                  {/* Card Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {job.category}
                        </span>
                        {job.urgent && (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3" />
                            Urgent
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-slate-400">Target Budget</div>
                        <div className="text-xl font-black text-emerald-400 font-mono">${job.targetBudget}</div>
                      </div>
                    </div>

                    {/* Title & Meta */}
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {job.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  {/* Benchmark & Bid Stats */}
                  <div className="bg-slate-800/60 rounded-2xl p-3.5 border border-slate-700/60 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Average Local Rate</span>
                      <span className="text-amber-300 font-extrabold font-mono">${job.avgMarketBenchmark}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Bids Received</span>
                      <span className="text-white font-bold flex items-center gap-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{job.bids.length} Contractor Bids</span>
                      </span>
                    </div>
                  </div>

                  {/* Footer Meta & Action */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.postedTime}</span>
                      </span>
                    </div>

                    {userRole === 'contractor' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPlaceBidModal(job);
                        }}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-colors flex items-center gap-1"
                      >
                        <HardHat className="w-3.5 h-3.5" />
                        <span>Submit Bid</span>
                      </button>
                    ) : (
                      <span className="text-indigo-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>View Bids & Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3 max-w-md mx-auto">
            <Filter className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Jobs Found Matching Criteria</h3>
            <p className="text-xs text-slate-500">
              Try switching trade categories or clearing filters to view available jobs.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
