import React from 'react';
import { Layers, CheckCircle2, Clock, MapPin, HardHat } from 'lucide-react';

export default function MyJobsDashboard({ jobs, onSelectJob, onNavigateToExplore }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Jobs & Bids Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Track status of your posted tasks, inspect active contractor proposals, or review completed services.
          </p>
        </div>
        <button
          onClick={onNavigateToExplore}
          className="clay-button-primary px-4 py-2 text-xs self-start sm:self-auto"
        >
          Browse Jobs Feed
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
                className="clay-card clay-card-hover p-6 cursor-pointer space-y-4 bg-white"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider clay-surface-indigo text-indigo-950">
                        {job.category}
                      </span>
                      {acceptedBid ? (
                        <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider clay-surface-emerald text-emerald-950 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          Pro Hired ({acceptedBid.contractorName})
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider clay-surface-amber text-amber-950">
                          Receiving Bids ({job.bids.length})
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-slate-900">{job.title}</h3>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Posted {job.postedTime}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <div className="text-[11px] font-bold text-slate-400">Target Budget</div>
                      <div className="text-xl font-black text-emerald-600 font-mono">${job.targetBudget}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400">Avg Benchmark</div>
                      <div className="text-xl font-black text-amber-600 font-mono">${job.avgMarketBenchmark}</div>
                    </div>
                  </div>
                </div>

                {acceptedBid && (
                  <div className="clay-surface-emerald p-4 rounded-2xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={acceptedBid.contractorAvatar}
                        alt={acceptedBid.contractorName}
                        className="w-10 h-10 rounded-2xl object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <div className="font-black text-emerald-950">{acceptedBid.contractorName}</div>
                        <div className="text-emerald-900 font-bold text-[11px]">Agreed Rate: ${acceptedBid.amount} • Arrival: {acceptedBid.proposedTimeline}</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-600 text-white font-black rounded-xl text-[10px] shadow-sm">
                      Scheduled
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="clay-card p-12 text-center text-slate-500 space-y-3 max-w-md mx-auto">
          <Layers className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-black text-slate-800">No Posted Jobs Found</h3>
          <p className="text-xs font-medium text-slate-500">Post a new task to start receiving competitive contractor bids.</p>
        </div>
      )}
    </div>
  );
}
