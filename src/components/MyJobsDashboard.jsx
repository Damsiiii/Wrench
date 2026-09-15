import React from 'react';
import { Layers, CheckCircle2, Clock, MapPin, DollarSign, HardHat, AlertCircle, XCircle } from 'lucide-react';

export default function MyJobsDashboard({ jobs, onSelectJob, onNavigateToExplore }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">My Jobs & Bids Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track status of your posted tasks, inspect active contractor proposals, or review completed services.
          </p>
        </div>
        <button
          onClick={onNavigateToExplore}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl self-start sm:self-auto"
        >
          Browse All Jobs Feed
        </button>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => {
            const acceptedBid = job.bids.find((b) => b.status === 'accepted');

            return (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 shadow-xl transition-all cursor-pointer space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {job.category}
                      </span>
                      {acceptedBid ? (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Pro Hired ({acceptedBid.contractorName})
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          Receiving Bids ({job.bids.length})
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-extrabold text-white">{job.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Posted {job.postedTime}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <div className="text-[11px] text-slate-400">Target Budget</div>
                      <div className="text-xl font-black text-emerald-400 font-mono">${job.targetBudget}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">Avg Benchmark</div>
                      <div className="text-xl font-black text-amber-400 font-mono">${job.avgMarketBenchmark}</div>
                    </div>
                  </div>
                </div>

                {acceptedBid && (
                  <div className="bg-emerald-950/30 border border-emerald-800/40 p-3.5 rounded-2xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={acceptedBid.contractorAvatar}
                        alt={acceptedBid.contractorName}
                        className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                      />
                      <div>
                        <div className="font-bold text-white">{acceptedBid.contractorName}</div>
                        <div className="text-emerald-300 text-[11px]">Agreed Rate: ${acceptedBid.amount} • Arrival: {acceptedBid.proposedTimeline}</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-black rounded-lg text-[10px]">
                      Scheduled
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
          <Layers className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Posted Jobs Found</h3>
          <p className="text-xs text-slate-500">Post a new task to start receiving competitive contractor bids.</p>
        </div>
      )}
    </div>
  );
}
