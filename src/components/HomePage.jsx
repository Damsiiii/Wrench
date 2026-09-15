import React, { useState } from 'react';
import {
  Wrench,
  Sparkles,
  Paintbrush,
  MapPin,
  ChevronDown,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { TOWNS } from '../data/mockData';

export default function HomePage({
  jobs,
  onNavigateToFindWork,
  onNavigateToPostJob,
  onSelectJob,
  onSelectTown
}) {
  const [selectedTown, setSelectedTown] = useState('Kurunegala');

  const recentJobs = jobs.slice(0, 3);

  const handleBrowseJobs = () => {
    if (onSelectTown) onSelectTown(selectedTown);
    onNavigateToFindWork();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Hero Headline */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          A job to do. A person to do it.
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Get things done around your home. Simple, local and reliable.
        </p>
      </div>

      {/* Dual Entry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Card 1: I need help (Mint background) */}
        <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                I need help
              </h2>
              <p className="text-slate-600 mt-1 text-sm sm:text-base">
                Find someone for repairs, cleaning and more.
              </p>
            </div>

            {/* Category Icons Row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <button
                onClick={onNavigateToPostJob}
                className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/60 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#008272] shadow-sm mb-2 group-hover:scale-105 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-slate-800 leading-tight">
                  Repairs &<br />maintenance
                </span>
              </button>

              <button
                onClick={onNavigateToPostJob}
                className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/60 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#008272] shadow-sm mb-2 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-slate-800 leading-tight">
                  Cleaning &<br />housekeeping
                </span>
              </button>

              <button
                onClick={onNavigateToPostJob}
                className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/60 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#008272] shadow-sm mb-2 group-hover:scale-105 transition-transform">
                  <Paintbrush className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-slate-800 leading-tight">
                  Painting &<br />decorating
                </span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={onNavigateToPostJob}
              className="w-full bg-[#111827] hover:bg-slate-800 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Post a job</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: I'm looking for work (White bordered card) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                I'm looking for work
              </h2>
              <p className="text-slate-600 mt-1 text-sm sm:text-base">
                See jobs nearby and send your quote.
              </p>
            </div>

            {/* Select Town Dropdown */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-700">
                Select your town
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <MapPin className="w-5 h-5 text-slate-700" />
                </div>
                <select
                  value={selectedTown}
                  onChange={(e) => setSelectedTown(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-11 pr-10 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008272] appearance-none"
                >
                  {TOWNS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleBrowseJobs}
              className="w-full bg-white hover:bg-slate-50 text-slate-900 font-semibold py-3.5 px-6 rounded-xl border border-slate-900 flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Browse jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recently Posted Jobs */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Recently posted jobs</h3>
          <button
            onClick={onNavigateToFindWork}
            className="text-sm font-bold text-[#008272] hover:text-[#006357] flex items-center gap-1"
          >
            <span>View all jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => onSelectJob(job)}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3 flex items-center gap-3 cursor-pointer shadow-sm hover:shadow transition-all group"
            >
              <img
                src={job.photos[0]}
                alt={job.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-slate-100"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-[#008272] transition-colors">
                  {job.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{job.town}</span>
                </div>
                <div className="text-sm font-bold text-[#008272] mt-1">
                  Rs. {job.budget?.toLocaleString()}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
