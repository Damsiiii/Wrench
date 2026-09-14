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
  Info,
  HelpCircle,
  Award,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function JobDetailView({ job, onClose, onOpenPlaceBidModal, onAcceptBid, userRole }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {job.category}
            </span>
            <span className="text-xs text-slate-400">Posted by {job.postedBy} • {job.postedTime}</span>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">

          {/* Job Overview Title & Photos */}
          <div className="space-y-3">
            <h1 className="text-2xl font-black text-white leading-tight">{job.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{job.location}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{job.urgent ? 'Urgent / Immediate Service' : 'Standard Schedule'}</span>
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
              {job.description}
            </p>
          </div>

          {/* Target Budget vs Local Market Average Benchmark */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl space-y-1">
              <span className="text-slate-400 text-xs">Homeowner Target Budget</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">${job.targetBudget}</div>
              <p className="text-[11px] text-slate-400">Budget target set by posting homeowner.</p>
            </div>

            <div className="bg-gradient-to-br from-amber-950/30 to-slate-800 border border-amber-500/30 p-4 rounded-2xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                  <Scale className="w-4 h-4" />
                  <span>Average Local Market Benchmark</span>
                </span>
              </div>
              <div className="text-2xl font-black text-amber-300 font-mono">${job.avgMarketBenchmark}</div>
              <p className="text-[11px] text-slate-400">Cross-referenced with regional material and labor averages.</p>
            </div>
          </div>

          {/* Bids Section */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-indigo-400" />
                <span>Contractor Bids ({job.bids.length})</span>
              </h2>

              {userRole === 'contractor' && (
                <button
                  onClick={() => onOpenPlaceBidModal(job)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <HardHat className="w-4 h-4" />
                  <span>Submit Your Bid</span>
                </button>
              )}
            </div>

            {job.bids.length > 0 ? (
              <div className="space-y-4">
                {job.bids.map((bid) => (
                  <div
                    key={bid.id}
                    className={`bg-slate-800/80 border rounded-2xl p-5 space-y-4 transition-all ${
                      bid.status === 'accepted'
                        ? 'border-emerald-500 bg-emerald-950/20'
                        : 'border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    {/* Contractor Header & Bid Amount */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
                      <div className="flex items-center gap-3">
                        <img
                          src={bid.contractorAvatar}
                          alt={bid.contractorName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-sm text-white">{bid.contractorName}</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              {bid.badge}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                            <span>★ {bid.rating} Rating</span>
                            <span>•</span>
                            <span>{bid.jobsCompleted} Jobs Completed</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="text-2xl font-black text-emerald-400 font-mono">${bid.amount}</div>
                        <div className="text-[11px] text-indigo-300 font-medium">Arrival: {bid.proposedTimeline}</div>
                      </div>
                    </div>

                    {/* Itemized Cost Breakdown */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Labor Hours</span>
                        <span className="font-bold text-slate-200">{bid.laborHours} Hours</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Parts & Supplies</span>
                        <span className="font-bold text-slate-200">${bid.partsCost}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Service Call Fee</span>
                        <span className="font-bold text-slate-200">${bid.calloutFee}</span>
                      </div>
                    </div>

                    {/* Contractor Bid Explanation / Reasonableness */}
                    <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                      <div className="font-bold text-slate-300 flex items-center gap-1.5 text-[11px]">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Contractor's Price Reasonableness Explanation:</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        {bid.bidExplanation}
                      </p>
                    </div>

                    {/* Accept Action */}
                    {userRole === 'homeowner' && (
                      <div className="flex justify-end pt-1">
                        {bid.status === 'accepted' ? (
                          <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold rounded-xl flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Bid Accepted • Service Scheduled</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAcceptBid(job.id, bid.id)}
                            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-transform active:scale-95"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Accept Bid & Hire Pro</span>
                          </button>
                        )}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 space-y-2">
                <HardHat className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="font-bold text-white">No bids submitted for this job yet</p>
                <p className="text-slate-500 text-[11px]">Local licensed contractors will review scope and post itemized proposals shortly.</p>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
}
