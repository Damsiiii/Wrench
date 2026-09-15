import React, { useState } from 'react';
import { X, PlusCircle, AlertCircle, Image, DollarSign, Calendar, Clock, MapPin } from 'lucide-react';

export default function PostJobModal({ isOpen, onClose, onSubmitJob }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electrician',
    location: '',
    targetBudget: '',
    urgent: false,
    description: '',
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.targetBudget || !formData.description) return;

    const newJob = {
      id: `job-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      postedBy: 'You (Homeowner)',
      location: formData.location || 'Local Area',
      postedTime: 'Just now',
      urgent: formData.urgent,
      status: 'open',
      description: formData.description,
      targetBudget: Number(formData.targetBudget),
      avgMarketBenchmark: Math.round(Number(formData.targetBudget) * 1.15),
      photos: [formData.photoUrl],
      bids: []
    };

    onSubmitJob(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div className="clay-card bg-slate-50 w-full max-w-xl shadow-2xl overflow-hidden my-auto border-2 border-white text-slate-900">

        {/* Header */}
        <div className="p-6 border-b-2 border-slate-200/80 flex items-center justify-between bg-slate-100/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl clay-surface-indigo flex items-center justify-center text-indigo-800 font-bold">
              <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-slate-900">Post a Job for Contractor Bids</h2>
              <p className="text-xs text-slate-500 font-medium">Pros will bid with itemized cost breakdowns</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-800 rounded-xl">
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Job Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Upgrade 200A Electrical Panel & Install Outlet"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Trade Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800"
              >
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Handyman">Handyman</option>
                <option value="HVAC Tech">HVAC Tech</option>
                <option value="Painter">Painter</option>
                <option value="Locksmith">Locksmith</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Target Budget ($ USD)</label>
              <input
                type="number"
                required
                placeholder="500"
                value={formData.targetBudget}
                onChange={(e) => setFormData({ ...formData, targetBudget: e.target.value })}
                className="w-full px-4 py-3 clay-input text-xs font-mono font-bold text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Location / Zip Code</label>
            <input
              type="text"
              placeholder="Austin, TX (78704)"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800 placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Job Details & Scope</label>
            <textarea
              rows={4}
              required
              placeholder="Describe what needs to be fixed or installed, existing conditions, accessibility, and preferred brand parts..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="urgent"
              checked={formData.urgent}
              onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
              className="w-4 h-4 rounded-lg accent-indigo-600"
            />
            <label htmlFor="urgent" className="text-slate-700 font-bold cursor-pointer">
              Mark as Urgent / Same-Day Service Needed
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="clay-button-secondary px-4 py-2.5 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="clay-button-primary px-5 py-2.5 text-xs"
            >
              Post Job & Broadcast
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
