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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div className="clay-card bg-slate-50 w-full max-w-xl shadow-2xl overflow-hidden my-auto border-2 border-white text-slate-900">

        {/* Header */}
        <div className="p-6 border-b-2 border-slate-200/80 flex items-center justify-between bg-slate-100/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl clay-surface-amber flex items-center justify-center text-amber-900 font-bold">
              <HardHat className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-slate-900">Submit Itemized Bid</h2>
              <p className="text-xs text-slate-500 font-medium truncate max-w-sm">{job.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-800 rounded-xl">
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-semibold">
          {/* Target vs Benchmark Indicator */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="clay-surface-emerald p-3.5 rounded-2xl">
              <span className="text-emerald-900 text-[11px] font-bold block">Homeowner Budget</span>
              <span className="text-emerald-950 font-black text-base font-mono">${job.targetBudget}</span>
            </div>
            <div className="clay-surface-amber p-3.5 rounded-2xl">
              <span className="text-amber-900 text-[11px] font-bold block">Average Local Benchmark</span>
              <span className="text-amber-950 font-black text-base font-mono">${job.avgMarketBenchmark}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Total Bid Amount ($)</label>
              <input
                type="number"
                required
                value={bidData.amount}
                onChange={(e) => setBidData({ ...bidData, amount: e.target.value })}
                className="w-full px-4 py-3 clay-input text-xs font-mono font-black text-slate-800"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Proposed Arrival / Start Time</label>
              <input
                type="text"
                required
                placeholder="e.g. Tomorrow at 10:00 AM"
                value={bidData.proposedTimeline}
                onChange={(e) => setBidData({ ...bidData, proposedTimeline: e.target.value })}
                className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800"
              />
            </div>
          </div>

          {/* Itemized Breakdown */}
          <div>
            <label className="block text-slate-700 font-bold mb-2">Itemized Cost Breakdown</label>
            <div className="grid grid-cols-3 gap-3 bg-slate-200/60 p-3 rounded-2xl border border-white shadow-inner">
              <div>
                <label className="text-[10px] text-slate-500 font-bold block mb-1">Labor (Hours)</label>
                <input
                  type="number"
                  value={bidData.laborHours}
                  onChange={(e) => setBidData({ ...bidData, laborHours: e.target.value })}
                  className="w-full px-3 py-2 clay-input text-xs font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-bold block mb-1">Parts Cost ($)</label>
                <input
                  type="number"
                  value={bidData.partsCost}
                  onChange={(e) => setBidData({ ...bidData, partsCost: e.target.value })}
                  className="w-full px-3 py-2 clay-input text-xs font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-bold block mb-1">Service Fee ($)</label>
                <input
                  type="number"
                  value={bidData.calloutFee}
                  onChange={(e) => setBidData({ ...bidData, calloutFee: e.target.value })}
                  className="w-full px-3 py-2 clay-input text-xs font-mono text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Why is this bid fair & reasonable?</label>
            <textarea
              rows={3}
              placeholder="Explain the work process, certifications, warranties, and why this rate reflects solid value..."
              value={bidData.bidExplanation}
              onChange={(e) => setBidData({ ...bidData, bidExplanation: e.target.value })}
              className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="clay-button-secondary px-4 py-2.5 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="clay-button-amber px-5 py-2.5 text-xs"
            >
              Submit Official Bid
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
