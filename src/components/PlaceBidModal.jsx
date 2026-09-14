import React, { useState } from 'react';
import { X, HardHat, DollarSign, Clock, Wrench, ShieldCheck, FileText } from 'lucide-react';

export default function PlaceBidModal({ isOpen, job, onClose, onSubmitBid }) {
  const [bidData, setBidData] = useState({
    contractorName: 'Apex Pro Services LLC',
    badge: 'Master Certified',
    amount: job?.targetBudget ? String(job.targetBudget) : '500',
    laborHours: '4',
    partsCost: '120',
    calloutFee: '40',
    proposedTimeline: 'Tomorrow at 9:00 AM',
    bidExplanation: ''
  });

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBid = {
      id: `bid-${Date.now()}`,
      contractorId: `c-${Date.now()}`,
      contractorName: bidData.contractorName,
      contractorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      badge: bidData.badge,
      rating: 4.9,
      jobsCompleted: 118,
      amount: Number(bidData.amount),
      laborHours: Number(bidData.laborHours),
      partsCost: Number(bidData.partsCost),
      calloutFee: Number(bidData.calloutFee),
      proposedTimeline: bidData.proposedTimeline,
      bidExplanation: bidData.bidExplanation || `Competitive bid tailored for ${job.title}. Includes full itemized labor, commercial parts guarantee, and code compliance.`,
      status: 'pending'
    };

    onSubmitBid(job.id, newBid);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden my-auto">

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white">Submit Itemized Bid</h2>
              <p className="text-xs text-slate-400 truncate max-w-sm">{job.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Target vs Benchmark Indicator */}
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/70 flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[11px]">Homeowner Target Budget</span>
              <span className="text-base font-extrabold text-emerald-400 font-mono">${job.targetBudget}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[11px]">Average Local Benchmark</span>
              <span className="text-base font-extrabold text-amber-400 font-mono">${job.avgMarketBenchmark}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Total Bid Amount ($)</label>
              <input
                type="number"
                required
                value={bidData.amount}
                onChange={(e) => setBidData({ ...bidData, amount: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono font-bold text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Proposed Arrival / Start Time</label>
              <input
                type="text"
                required
                placeholder="e.g. Tomorrow at 10:00 AM"
                value={bidData.proposedTimeline}
                onChange={(e) => setBidData({ ...bidData, proposedTimeline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Itemized Breakdown Inputs */}
          <div>
            <label className="block text-slate-300 font-bold mb-2">Itemized Cost Breakdown</label>
            <div className="grid grid-cols-3 gap-3 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/60">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Labor (Hours)</label>
                <input
                  type="number"
                  value={bidData.laborHours}
                  onChange={(e) => setBidData({ ...bidData, laborHours: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Parts Cost ($)</label>
                <input
                  type="number"
                  value={bidData.partsCost}
                  onChange={(e) => setBidData({ ...bidData, partsCost: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Service Fee ($)</label>
                <input
                  type="number"
                  value={bidData.calloutFee}
                  onChange={(e) => setBidData({ ...bidData, calloutFee: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Bid Reasonableness Explanation */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">Why is this bid fair & reasonable?</label>
            <textarea
              rows={3}
              placeholder="Explain the work process, certifications, warranties, and why this rate reflects solid value..."
              value={bidData.bidExplanation}
              onChange={(e) => setBidData({ ...bidData, bidExplanation: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500"
            >
              Submit Official Bid
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
