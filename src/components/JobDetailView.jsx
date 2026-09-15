import React from 'react';
import {
  X,
  MapPin,
  Clock,
  DollarSign,
  Scale,
  ShieldCheck,
  CheckCircle,
  HardHat,
  TrendingDown,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export default function JobDetailView({ job, onClose, onOpenPlaceBidModal, onAcceptBid, userRole }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div className="clay-card bg-slate-50 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto border-2 border-white">

        {/* Header */}
        <div className="p-6 border-b-2 border-slate-200/80 flex items-center justify-between bg-slate-100/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider clay-surface-indigo text-indigo-950">
              {job.category}
            </span>
            <span className="text-xs text-slate-500 font-bold">Posted by {job.postedBy} • {job.postedTime}</span>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-800 rounded-xl transition-colors">
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">

          {/* Job Overview Title & Details */}
          <div className="space-y-3">
            <h1 className="text-2xl font-black text-slate-900 leading-tight">{job.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-slate-600 font-bold">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{job.location}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{job.urgent ? 'Urgent / Immediate Service' : 'Standard Schedule'}</span>
              </span>
            </div>

            <p className="text-slate-700 text-sm font-medium leading-relaxed clay-card p-5 bg-white/80">
              {job.description}
            </p>
          </div>

          {/* Volumetric Benchmark Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="clay-card clay-surface-emerald p-5 space-y-1">
              <span className="text-emerald-900 text-xs font-bold block">Homeowner Target Budget</span>
              <div className="text-3xl font-black text-emerald-950 font-mono">${job.targetBudget}</div>
              <p className="text-[11px] text-emerald-800 font-medium">Budget target set by posting homeowner.</p>
            </div>

            <div className="clay-card clay-surface-amber p-5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-amber-950 font-black text-xs flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-amber-700" />
                  <span>Average Local Market Benchmark</span>
                </span>
              </div>
              <div className="text-3xl font-black text-amber-950 font-mono">${job.avgMarketBenchmark}</div>
              <p className="text-[11px] text-amber-900 font-medium">Cross-referenced with regional material and labor averages.</p>
            </div>
          </div>

          {/* Bids Section */}
          <div className="space-y-4 pt-4 border-t-2 border-slate-200/80">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-indigo-600" />
                <span>Contractor Bids ({job.bids.length})</span>
              </h2>

              {userRole === 'contractor' && (
                <button
                  onClick={() => onOpenPlaceBidModal(job)}
                  className="clay-button-amber px-4 py-2 text-xs flex items-center gap-1.5"
                >
                  <HardHat className="w-4 h-4 stroke-[2.5]" />
                  <span>Submit Your Bid</span>
                </button>
              )}
            </div>

            {job.bids.length > 0 ? (
              <div className="space-y-4">
                {job.bids.map((bid) => (
                  <div
                    key={bid.id}
                    className={`clay-card p-5 space-y-4 ${
                      bid.status === 'accepted'
                        ? 'clay-surface-emerald border-2 border-emerald-400'
                        : 'bg-white'
                    }`}
                  >
                    {/* Contractor Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <img
                          src={bid.contractorAvatar}
                          alt={bid.contractorName}
                          className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-black text-sm text-slate-900">{bid.contractorName}</h3>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider clay-surface-amber text-amber-950">
                              {bid.badge}
                            </span>
                          </div>
                          <div className="text-[11px] font-bold text-slate-500 mt-0.5 flex items-center gap-2">
                            <span>★ {bid.rating} Rating</span>
                            <span>•</span>
                            <span>{bid.jobsCompleted} Jobs Completed</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="text-2xl font-black text-emerald-700 font-mono">${bid.amount}</div>
                        <div className="text-[11px] text-indigo-700 font-bold">Arrival: {bid.proposedTimeline}</div>
                      </div>
                    </div>

                    {/* Cost Breakdown Clay Pills */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-100 p-3 rounded-2xl border border-slate-200 text-[11px]">
                      <div>
                        <span className="text-slate-500 font-medium block">Labor Hours</span>
                        <span className="font-extrabold text-slate-800">{bid.laborHours} Hours</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium block">Parts & Supplies</span>
                        <span className="font-extrabold text-slate-800">${bid.partsCost}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium block">Service Call Fee</span>
                        <span className="font-extrabold text-slate-800">${bid.calloutFee}</span>
                      </div>
                    </div>

                    {/* Price Reasonableness Explanation */}
                    <div className="clay-surface-sky p-3.5 rounded-2xl space-y-1">
                      <div className="font-black text-sky-950 flex items-center gap-1.5 text-[11px]">
                        <HelpCircle className="w-4 h-4 text-sky-700" />
                        <span>Contractor's Price Reasonableness Explanation:</span>
                      </div>
                      <p className="text-slate-800 font-medium leading-relaxed text-[11px]">
                        {bid.bidExplanation}
                      </p>
                    </div>

                    {/* Action */}
                    {userRole === 'homeowner' && (
                      <div className="flex justify-end pt-1">
                        {bid.status === 'accepted' ? (
                          <div className="px-4 py-2 rounded-2xl clay-surface-emerald text-emerald-950 font-black flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>Bid Accepted • Service Scheduled</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAcceptBid(job.id, bid.id)}
                            className="clay-button-primary px-5 py-2.5 text-xs flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                            <span>Accept Bid & Hire Pro</span>
                          </button>
                        )}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            ) : (
              <div className="clay-card p-8 text-center text-slate-500 space-y-2">
                <HardHat className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="font-black text-slate-800">No bids submitted for this job yet</p>
                <p className="text-slate-500 text-[11px] font-medium">Local licensed contractors will review scope and post itemized proposals shortly.</p>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-slate-200/80 bg-slate-100/90 flex justify-end">
          <button
            onClick={onClose}
            className="clay-button-secondary px-5 py-2 text-xs font-bold"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
}
