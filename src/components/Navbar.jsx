import React from 'react';
import { Wrench as WrenchIcon, PlusCircle, ShieldCheck, Scale, User, HardHat, TrendingDown, Layers } from 'lucide-react';

export default function Navbar({
  userRole,
  setUserRole,
  onOpenPostJob,
  onOpenMarketGuide,
  activeTab,
  setActiveTab,
  jobCount
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Brand Logo & Name */}
        <div className="flex items-center gap-8">
          <div
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <WrenchIcon className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-white font-mono uppercase">WRENCH</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Fair Bid
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Reverse-Bidding & Fair-Price Benchmark Engine</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'feed'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Live Job Feed ({jobCount})</span>
            </button>

            <button
              onClick={onOpenMarketGuide}
              className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all flex items-center gap-2"
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Average Price Guide</span>
            </button>
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* User Role Switcher */}
          <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => setUserRole('homeowner')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                userRole === 'homeowner'
                  ? 'bg-slate-700 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Homeowner</span>
            </button>
            <button
              onClick={() => setUserRole('contractor')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                userRole === 'contractor'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>Pro Contractor</span>
            </button>
          </div>

          {/* Action Button */}
          {userRole === 'homeowner' ? (
            <button
              onClick={onOpenPostJob}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Job for Bids</span>
            </button>
          ) : (
            <div className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-semibold flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Bidding Mode Active</span>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
