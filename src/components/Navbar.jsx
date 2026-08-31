import React from 'react';
import { Wrench, Calendar, PlusCircle, UserPlus, Heart, Search } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenPostTask,
  onOpenBecomePro,
  searchQuery,
  setSearchQuery
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('explore')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Wrench className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 bg-clip-text text-transparent tracking-tight">
                Wrench
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                Micro-Services & Pros
              </span>
            </div>
          </div>

          {/* Quick Search on Nav (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search electrician, plumber, TV mount, leak..."
                className="w-full pl-10 pr-4 py-1.5 text-sm bg-slate-100/80 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'explore'
                  ? 'bg-slate-100 text-indigo-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Explore Pros
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'bookings'
                  ? 'bg-slate-100 text-indigo-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>My Bookings</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors ${
                activeTab === 'saved' ? 'text-rose-600 bg-rose-50' : ''
              }`}
              title="Saved Favorites"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenPostTask}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>Post a Task</span>
            </button>

            <button
              onClick={onOpenBecomePro}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden xs:inline">Join as a Pro</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
