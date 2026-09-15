import React from 'react';
import { Wrench as WrenchIcon, PlusCircle, Scale, User, HardHat, Layers, Users, BookOpen, Briefcase } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-slate-100/90 backdrop-blur-md border-b-2 border-slate-200/80 text-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <div
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl clay-surface-indigo flex items-center justify-center text-indigo-700 group-hover:scale-105 transition-transform">
              <WrenchIcon className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tight text-slate-900 font-mono uppercase">WRENCH</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full clay-surface-amber text-amber-900">
                  Fair Bid
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden lg:block">Volumetric Claymorphic Service Engine</p>
            </div>
          </div>

          {/* Navigation Links - Clay Pills */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-200/70 p-1.5 rounded-2xl border border-white/80 shadow-inner text-xs font-bold">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'feed'
                  ? 'clay-surface-indigo text-indigo-950 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Jobs Feed ({jobCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('my_jobs')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'my_jobs'
                  ? 'clay-surface-emerald text-emerald-950 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>My Jobs</span>
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'directory'
                  ? 'clay-surface-sky text-sky-950 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4 text-sky-600" />
              <span>Pros Directory</span>
            </button>

            <button
              onClick={() => setActiveTab('how_it_works')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'how_it_works'
                  ? 'clay-surface-rose text-rose-950 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-rose-600" />
              <span>How It Works</span>
            </button>

            <button
              onClick={onOpenMarketGuide}
              className="px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center gap-1.5"
            >
              <Scale className="w-4 h-4 text-amber-600" />
              <span>Price Guide</span>
            </button>
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* User Role Switcher */}
          <div className="hidden sm:flex items-center bg-slate-200/80 p-1.5 rounded-2xl border border-white/80 text-xs shadow-inner">
            <button
              onClick={() => setUserRole('homeowner')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                userRole === 'homeowner'
                  ? 'clay-surface-sky text-sky-950 font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span>Homeowner</span>
            </button>
            <button
              onClick={() => setUserRole('contractor')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                userRole === 'contractor'
                  ? 'clay-surface-amber text-amber-950 font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <HardHat className="w-3.5 h-3.5 text-amber-600" />
              <span>Pro Contractor</span>
            </button>
          </div>

          {/* Action Button */}
          {userRole === 'homeowner' ? (
            <button
              onClick={onOpenPostJob}
              className="clay-button-primary px-5 py-2.5 text-xs flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Post Job For Bids</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('join_pro')}
              className="clay-button-amber px-5 py-2.5 text-xs flex items-center gap-2"
            >
              <HardHat className="w-4 h-4 stroke-[2.5]" />
              <span>Join Pro Network</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
