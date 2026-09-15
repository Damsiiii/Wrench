import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  User,
  Calendar,
  Clock,
  ListChecks,
  MessageSquare,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function SendQuotePage({ job, onBack, onSubmitQuote, currentUser }) {
  const [totalQuote, setTotalQuote] = useState('4,500');
  const [date, setDate] = useState('18 Sep 2026');
  const [timeOfDay, setTimeOfDay] = useState('Morning');
  const [inclusions, setInclusions] = useState('Labour and replacement pipe fittings.');
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [laborPart, setLaborPart] = useState('3,000');
  const [materialsPart, setMaterialsPart] = useState('1,500');
  const [message, setMessage] = useState(
    'Hi Kasun, I can fix the leaking pipe and check for any other issues. Please let me know if you have any questions.'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericAmount = parseInt(totalQuote.replace(/\D/g, '') || '0', 10);
    const newQuote = {
      id: `quote-${Date.now()}`,
      workerId: currentUser?.id || 'w-1',
      workerName: currentUser?.name || 'Saman Kumara',
      workerRating: 4.8,
      workerReviewsCount: 27,
      workerTown: 'Kurunegala',
      workerAvatar:
        currentUser?.avatar ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      amount: numericAmount,
      availability: `Available ${date}, ${timeOfDay.toLowerCase()}`,
      appointmentDate: `${date} (Friday)`,
      appointmentTime: `${timeOfDay} (8.00 am - 12.00 pm)`,
      includes: inclusions,
      inclusionsDetails: inclusions,
      message,
      status: 'pending',
      recommended: false
    };

    onSubmitQuote(job.id, newQuote);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back to Job link */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to job</span>
      </button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Send a quote</h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Tell the homeowner how you can help.
        </p>
      </div>

      {/* Job Summary Banner Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={job.photos[0]}
            alt={job.title}
            className="w-20 h-16 rounded-xl object-cover border border-slate-100 flex-shrink-0"
          />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {job.town}
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {job.customer.name} (Homeowner)
              </span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-1 max-w-xl">{job.description}</p>
          </div>
        </div>

        <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto">
          <div className="text-xs text-slate-500 font-medium">Budget (approx.)</div>
          <div className="text-xl font-extrabold text-[#008272]">
            Rs. {job.budget?.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Main Grid: Form (Left) & Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm"
        >
          {/* Row 1: Quote Amount & Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Your total quote (Rs.)</label>
              <input
                type="text"
                value={totalQuote}
                onChange={(e) => setTotalQuote(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="e.g. 4,500"
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">When can you come?</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-600">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl pl-9 pr-2 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none"
                  />
                </div>
                <select
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                  className="bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: What's included */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">What's included?</label>
              <span className="text-[11px] text-slate-400">{inclusions.length}/500</span>
            </div>
            <textarea
              rows={2}
              maxLength={500}
              value={inclusions}
              onChange={(e) => setInclusions(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none"
            />
          </div>

          {/* Optional Breakdown Accordion */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setBreakdownOpen(!breakdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span>Add labour / materials breakdown (optional)</span>
              {breakdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {breakdownOpen && (
              <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200">
                <div>
                  <label className="text-xs font-medium text-slate-600">Estimated Labour (Rs.)</label>
                  <input
                    type="text"
                    value={laborPart}
                    onChange={(e) => setLaborPart(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">Estimated Materials (Rs.)</label>
                  <input
                    type="text"
                    value={materialsPart}
                    onChange={(e) => setMaterialsPart(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs mt-1"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Row 3: A message to homeowner */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                A message to the homeowner (optional)
              </label>
              <span className="text-[11px] text-slate-400">{message.length}/500</span>
            </div>
            <textarea
              rows={3}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[#008272] hover:bg-[#007163] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm"
            >
              Send quote
            </button>
            <button
              type="button"
              onClick={onBack}
              className="flex-1 bg-white hover:bg-slate-50 text-slate-800 font-semibold py-3 px-6 rounded-xl border border-slate-300 transition-colors shadow-sm"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Right Column: Your quote preview (Mint Background) */}
        <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-2xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Your quote preview</h3>
            <p className="text-xs text-slate-600 mt-0.5">This is what the homeowner will see.</p>
          </div>

          {/* Preview Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            {/* Worker Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-sm">
                SK
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Saman Kumara</h4>
                <p className="text-xs text-slate-500">Local worker</p>
              </div>
            </div>

            {/* Total quote */}
            <div className="flex items-center justify-between border-t border-b border-slate-100 py-3">
              <span className="text-xs font-bold text-slate-700">Total quote</span>
              <span className="text-lg font-black text-[#008272]">
                Rs. {totalQuote || '0'}
              </span>
            </div>

            {/* Inclusions */}
            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <ListChecks className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">What's included?</div>
                  <div className="text-slate-600 mt-0.5">{inclusions || 'None specified'}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">When can you come?</div>
                  <div className="text-slate-600 mt-0.5">
                    {date}, {timeOfDay}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Message</div>
                  <div className="text-slate-600 mt-0.5">{message || 'No message'}</div>
                </div>
              </div>
            </div>

            {/* Info note */}
            <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
              <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>This quote will be sent to the homeowner. You can edit or withdraw it later.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
