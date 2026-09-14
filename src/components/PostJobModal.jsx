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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden my-auto">

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white">Post a Job for Contractor Bids</h2>
              <p className="text-xs text-slate-400">Pros will bid with itemized cost breakdowns</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">Job Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Upgrade 200A Electrical Panel & Install Outlet"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Trade Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              <label className="block text-slate-300 font-bold mb-1.5">Target Budget ($ USD)</label>
              <input
                type="number"
                required
                placeholder="500"
                value={formData.targetBudget}
                onChange={(e) => setFormData({ ...formData, targetBudget: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1.5">Location / Zip Code</label>
            <input
              type="text"
              placeholder="Austin, TX (78704)"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1.5">Job Details & Scope</label>
            <textarea
              rows={4}
              required
              placeholder="Describe what needs to be fixed or installed, existing conditions, accessibility, and preferred brand parts..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="urgent"
              checked={formData.urgent}
              onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
              className="w-4 h-4 rounded accent-indigo-600"
            />
            <label htmlFor="urgent" className="text-slate-300 font-medium">
              Mark as Urgent / Same-Day Service Needed
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-extrabold rounded-xl shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-indigo-700"
            >
              Post Job & Broadcast
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
