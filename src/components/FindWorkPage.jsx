import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Clock,
  ArrowRight,
  ChevronDown,
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Fan,
  Layers,
  Sparkles
} from 'lucide-react';
import { TOWNS, CATEGORIES } from '../data/mockData';

export default function FindWorkPage({
  jobs,
  onSelectJob,
  selectedTown = 'Kurunegala',
  setSelectedTown
}) {
  const [currentTown, setCurrentTown] = useState(selectedTown);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    // town filter
    if (currentTown && currentTown !== 'All' && job.town !== currentTown) {
      // let it pass if search query matches
      if (!searchQuery) return false;
    }
    // category filter
    if (selectedCategory !== 'all' && job.tradeCategory !== selectedCategory) {
      return false;
    }
    // urgent filter
    if (urgentOnly && !job.isUrgent) {
      return false;
    }
    // keyword search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchDesc = job.description.toLowerCase().includes(q);
      const matchCat = job.category.toLowerCase().includes(q);
      const matchTown = job.town.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat && !matchTown) return false;
    }
    return true;
  });

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'plumbing':
        return <Wrench className="w-4 h-4" />;
      case 'electrical':
        return <Zap className="w-4 h-4" />;
      case 'painting':
        return <Paintbrush className="w-4 h-4" />;
      case 'carpentry':
        return <Hammer className="w-4 h-4" />;
      case 'appliances':
        return <Fan className="w-4 h-4" />;
      case 'masonry':
        return <Layers className="w-4 h-4" />;
      default:
        return <Wrench className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Find work near you
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Household jobs, done by trusted local workers.
          </p>
        </div>

        {/* Urgent Jobs Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer self-start md:self-auto text-sm font-semibold text-slate-700 select-none">
          <input
            type="checkbox"
            checked={urgentOnly}
            onChange={(e) => setUrgentOnly(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-[#008272] focus:ring-[#008272]"
          />
          <span>Urgent jobs only</span>
        </label>
      </div>

      {/* Search & Location Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Town Select */}
        <div className="relative w-full sm:w-56">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
            <MapPin className="w-4 h-4" />
          </div>
          <select
            value={currentTown}
            onChange={(e) => {
              setCurrentTown(e.target.value);
              if (setSelectedTown) setSelectedTown(e.target.value);
            }}
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-9 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008272] appearance-none"
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

        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs or services (e.g. plumbing, painting...)"
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008272]"
          />
        </div>

        {/* Search CTA */}
        <button className="bg-[#008272] hover:bg-[#007163] text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm">
          Search
        </button>
      </div>

      {/* Main Content Layout: Categories Sidebar + Job List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Categories Sidebar (Mint Box) */}
        <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-2xl p-4 space-y-1">
          <h2 className="text-sm font-bold text-slate-900 px-3 py-2">All categories</h2>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-[#cbf0ea] text-[#006256] font-bold shadow-sm'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <span className={isSelected ? 'text-[#008272]' : 'text-slate-600'}>
                  {getCategoryIcon(cat.id)}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Job List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Header row with count and sort */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Latest jobs</h2>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-0 font-semibold text-slate-800 focus:ring-0 cursor-pointer pr-4"
              >
                <option value="newest">Newest first</option>
                <option value="budget_high">Highest budget</option>
                <option value="budget_low">Lowest budget</option>
              </select>
            </div>
          </div>

          {/* Job cards */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
              <p className="text-slate-600 text-sm font-medium">
                No jobs found matching your criteria in {currentTown}.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setUrgentOnly(false);
                }}
                className="text-sm font-bold text-[#008272] underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-slate-300 transition-all shadow-sm"
              >
                {/* Thumbnail */}
                <img
                  src={job.photos[0]}
                  alt={job.title}
                  className="w-full sm:w-36 sm:h-28 h-40 rounded-xl object-cover flex-shrink-0 bg-slate-100"
                />

                {/* Info Center */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.town}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {job.postedTime}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Price & Action Right */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 flex-shrink-0 gap-3">
                  <div className="sm:text-right">
                    <div className="text-lg sm:text-xl font-extrabold text-[#008272]">
                      Rs. {job.budget?.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Budget (approx.)
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectJob(job)}
                    className="bg-white hover:bg-teal-50 text-[#008272] border border-[#008272] font-semibold text-xs sm:text-sm px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <span>View job</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
