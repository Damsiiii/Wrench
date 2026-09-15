import React, { useState } from 'react';
import {
  MapPin,
  Camera,
  X,
  Wrench,
  Calendar,
  Banknote,
  FileText,
  CheckCircle2,
  Edit2,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { TOWNS, CATEGORIES } from '../data/mockData';

export default function PostJobPage({ onSubmitJob, onCancel }) {
  const [title, setTitle] = useState('Fix leaking bathroom pipe');
  const [category, setCategory] = useState('Plumbing');
  const [description, setDescription] = useState(
    'Water leaking from wash basin pipe. Need someone to fix and check for any other issues.'
  );
  const [town, setTown] = useState('Kurunegala');
  const [timing, setTiming] = useState('Flexible');
  const [budget, setBudget] = useState('5,000');
  const [notSureBudget, setNotSureBudget] = useState(false);
  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80'
  ]);

  const handleAddSamplePhoto = () => {
    if (photos.length >= 3) return;
    const sample =
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80';
    setPhotos([...photos, sample]);
  };

  const handleRemovePhoto = (idx) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;

    const newJob = {
      id: `job-${Date.now()}`,
      jobCode: `Job #J${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      category,
      tradeCategory: category.toLowerCase(),
      town,
      address: `${town} Central`,
      budget: notSureBudget ? 0 : parseInt(budget.replace(/\D/g, '') || '0', 10),
      status: 'open',
      postedTime: 'Just now',
      postedDate: 'Today',
      isUrgent: timing === 'Urgent',
      timing,
      materials: 'Please include materials in your quote.',
      additionalDetails: 'Standard residential property.',
      description,
      photos:
        photos.length > 0
          ? photos
          : [
              'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
            ],
      customer: {
        name: 'Kasun Perera',
        town,
        memberSince: '2026',
        verified: true
      },
      questions: [],
      quotes: [],
      hiredQuote: null
    };

    onSubmitJob(newJob);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Post a job</h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Tell us what you need. Local workers will send you quotes.
        </p>
      </div>

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Form (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-6 shadow-sm">
          {/* Row 1: Title & Trade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">What needs doing?*</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Fix leaking bathroom pipe"
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none"
              />
              <p className="text-[11px] text-slate-500">Use a short, clear title.</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Trade / Category*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-600">
                  <Wrench className="w-4 h-4" />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-8 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none appearance-none"
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Painting">Painting</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="AC & Appliances">AC & Appliances</option>
                  <option value="Masonry">Masonry</option>
                  <option value="Cleaning">Cleaning & housekeeping</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Description */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">Description*</label>
              <span className="text-[11px] text-slate-400">{description.length}/500</span>
            </div>
            <textarea
              rows={4}
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details to help workers understand the job."
              className="w-full border border-slate-300 rounded-xl p-3.5 text-sm text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none leading-relaxed"
            />
            <p className="text-[11px] text-slate-500">
              Add details to help workers understand the job.
            </p>
          </div>

          {/* Row 3: Photos */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">Photos (optional)</label>
            <div className="flex flex-wrap items-center gap-3">
              {photos.map((url, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200">
                  <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white rounded-full p-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {photos.length < 3 && (
                <button
                  type="button"
                  onClick={handleAddSamplePhoto}
                  className="w-24 h-24 border-2 border-dashed border-slate-300 hover:border-[#008272] rounded-xl flex flex-col items-center justify-center p-2 text-center text-slate-600 hover:text-[#008272] transition-colors"
                >
                  <Camera className="w-5 h-5 mb-1 text-slate-500" />
                  <span className="text-[11px] font-bold leading-tight">Add photos</span>
                  <span className="text-[9px] text-slate-400">Max 3 photos</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 4: Town & Timing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Town / Area*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <select
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-8 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none appearance-none"
                >
                  {TOWNS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">When do you need this done?</label>
              <div className="grid grid-cols-3 gap-2">
                {['Flexible', 'This week', 'Urgent'].map((opt) => {
                  const isSelected = timing === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTiming(opt)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                        isSelected
                          ? 'border-[#008272] text-[#008272] bg-teal-50/50 ring-1 ring-[#008272]'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-[#008272]' : 'border border-slate-400'
                        }`}
                      />
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 5: Budget */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800">Your budget (approx.)</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative w-full sm:w-60">
                <input
                  type="text"
                  disabled={notSureBudget}
                  value={notSureBudget ? 'Negotiable' : `Rs. ${budget}`}
                  onChange={(e) => setBudget(e.target.value.replace(/[^0-9]/g, ''))}
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none ${
                    notSureBudget ? 'bg-slate-100 border-slate-200 text-slate-400' : 'border-slate-300'
                  }`}
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notSureBudget}
                  onChange={(e) => setNotSureBudget(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#008272] focus:ring-[#008272]"
                />
                <span>I'm not sure</span>
              </label>
            </div>
            <p className="text-[11px] text-slate-500">
              This helps workers understand your expectations.
            </p>
          </div>
        </div>

        {/* Right Preview Column */}
        <div className="space-y-6">
          {/* Top Card: Value Props (Mint Background) */}
          <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#008272] shadow-sm flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#008272]" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                Workers nearby can send you quotes. Choose who to hire.
              </h3>
            </div>

            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#008272]" />
                <span>Reach trusted local workers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#008272]" />
                <span>Compare quotes and profiles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#008272]" />
                <span>No payment required now</span>
              </li>
            </ul>
          </div>

          {/* Bottom Card: Job Preview & Publish */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Job preview</h3>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Edit2 className="w-3 h-3" /> Edit
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {title || 'Untitled Job'}
              </h4>

              <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5 text-slate-400" />
                  <span>{category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{town}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>When: {timing}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Banknote className="w-3.5 h-3.5 text-slate-400" />
                  <span>Budget: {notSureBudget ? 'Negotiable' : `Rs. ${budget}`}</span>
                </div>
                <div className="flex items-start gap-2 pt-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="line-clamp-2 text-slate-600">{description}</p>
                </div>
              </div>

              {photos.length > 0 && (
                <div className="flex gap-2 pt-2">
                  {photos.map((p, i) => (
                    <img
                      key={i}
                      src={p}
                      alt="Thumbnail"
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#008272] hover:bg-[#007163] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm mt-4"
            >
              <span>Publish job</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-slate-500">
              Your job will be visible to local workers in your area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
