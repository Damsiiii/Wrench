import React from 'react';
import { Search, ShieldCheck, Clock, Star, Zap, Droplets, Wrench, Paintbrush, KeyRound, Sparkles, Wind, Refrigerator, ArrowRight, CheckCircle2 } from 'lucide-react';

const ICON_MAP = {
  Zap: Zap,
  Droplets: Droplets,
  Wrench: Wrench,
  Paintbrush: Paintbrush,
  KeyRound: KeyRound,
  Sparkles: Sparkles,
  Wind: Wind,
  Refrigerator: Refrigerator
};

export default function HeroSection({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onOpenPostTask
}) {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl">
      {/* Background Decor Elements */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-indigo-300 text-xs font-semibold mb-6 shadow-inner">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Verified Local Electricians, Plumbers & Micro-Task Pros</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
          Hire Trusted Local Pros for <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
            Electrical, Plumbing & Micro-Services
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Book certified electricians, expert plumbers, handymen, and emergency repair technicians in minutes. Transparent hourly pricing & instant dispatch.
        </p>

        {/* Search Bar Container */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service do you need today? (e.g., Electrician, Pipe leak, TV mount)"
                className="w-full pl-12 pr-4 py-3 text-sm sm:text-base text-slate-900 bg-white rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  const element = document.getElementById('pros-list');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 font-semibold text-white rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all whitespace-nowrap"
              >
                <span>Find Pros</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No hidden fees</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Upfront pricing</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Same-day response</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4">Popular Service Categories</p>
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-900 border-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
              }`}
            >
              All Categories
            </button>

            {categories.map((cat) => {
              const IconComp = ICON_MAP[cat.icon] || Wrench;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/30 scale-105'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-400'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
