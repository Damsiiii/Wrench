import React, { useState } from 'react';
import {
  Search,
  Filter,
  DollarSign,
  Clock,
  MapPin,
  TrendingDown,
  CheckCircle2,
  HardHat,
  ChevronRight,
  ShieldAlert
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

      {/* Search & Filter Toolbar - Clay Card */}
      <div className="clay-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Soft Clay Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search jobs by keyword, location, or trade (e.g., panel upgrade, Austin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 clay-input text-xs font-semibold text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Urgency Toggle Pill */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOnlyUrgent(!onlyUrgent)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                onlyUrgent
                  ? 'clay-surface-rose text-rose-950'
                  : 'clay-button-secondary text-slate-600'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Urgent Only</span>
            </button>
          </div>
        </div>

        {/* Category Soft Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'clay-surface-indigo text-indigo-950 font-black'
                  : 'clay-button-secondary text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Feed Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
          <span className="uppercase tracking-wider text-slate-700">
            Open Jobs Receiving Bids ({filteredJobs.length})
          </span>
          <span className="hidden sm:inline">Click any job card to inspect current contractor bids</span>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="clay-card clay-card-hover p-6 cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider clay-surface-indigo text-indigo-950">
                        {job.category}
                      </span>
                      {job.urgent && (
                        <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider clay-surface-rose text-rose-950 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-rose-700" />
                          Urgent
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] font-bold text-slate-400">Target Budget</div>
                      <div className="text-2xl font-black text-emerald-600 font-mono">${job.targetBudget}</div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Volumetric Benchmark Tiles */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="clay-surface-amber p-3.5 rounded-2xl">
                    <span className="text-amber-900 text-[11px] font-bold block">Average Local Rate</span>
                    <span className="text-amber-950 font-black text-base font-mono">${job.avgMarketBenchmark}</span>
                  </div>

                  <div className="clay-surface-sky p-3.5 rounded-2xl">
                    <span className="text-sky-900 text-[11px] font-bold block">Bids Received</span>
                    <span className="text-sky-950 font-black text-base flex items-center gap-1.5">
                      <TrendingDown className="w-4 h-4 text-sky-700" />
                      <span>{job.bids.length} Bids</span>
                    </span>
                  </div>
                </div>

                {/* Footer Meta & Action */}
                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.postedTime}</span>
                    </span>
                  </div>

                  {userRole === 'contractor' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPlaceBidModal(job);
                      }}
                      className="clay-button-amber px-4 py-2 text-xs flex items-center gap-1"
                    >
                      <HardHat className="w-4 h-4 stroke-[2.5]" />
                      <span>Submit Bid</span>
                    </button>
                  ) : (
                    <span className="text-indigo-600 font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Bids</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="clay-card p-12 text-center text-slate-500 space-y-3 max-w-md mx-auto">
            <Filter className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-black text-slate-800">No Jobs Found Matching Criteria</h3>
            <p className="text-xs text-slate-500 font-medium">
              Try switching trade categories or clearing filters to view available jobs.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
