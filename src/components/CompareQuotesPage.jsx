import React from 'react';
import {
  Star,
  MapPin,
  Calendar,
  Info,
  Edit2,
  ArrowRight,
  MessageSquare,
  UserCheck
} from 'lucide-react';

export default function CompareQuotesPage({
  job,
  onChooseWorker,
  onViewWorkerProfile,
  onOpenMessages,
  onEditJob
}) {
  const quotes = job.quotes || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Quotes for your job
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
          <span>{job.title}</span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 text-slate-600">
            <MapPin className="w-3.5 h-3.5" />
            {job.town}
          </span>
          <span className="bg-[#e6f7f5] text-[#008272] text-xs font-bold px-2.5 py-0.5 rounded-full">
            Open
          </span>
          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {quotes.length} quotes
          </span>
        </div>
      </div>

      {/* Main Layout: Quotes List (Left 2 cols) & Your Job Summary (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Quotes List */}
        <div className="lg:col-span-2 space-y-4">
          {quotes.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500">
              No quotes submitted for this job yet. Check back soon!
            </div>
          ) : (
            quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm hover:border-slate-300 transition-all"
              >
                {/* Worker Header & Price */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={quote.workerAvatar}
                      alt={quote.workerName}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {quote.workerName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="flex items-center gap-1 font-bold text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {quote.workerRating}
                        </span>
                        <span className="text-slate-400">({quote.workerReviewsCount} reviews)</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-slate-500">
                          <MapPin className="w-3 h-3" />
                          {quote.workerTown}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 pt-1 leading-relaxed">
                        {quote.includes}
                      </p>
                    </div>
                  </div>

                  {/* Price & Availability */}
                  <div className="sm:text-right flex-shrink-0">
                    <div className="text-xl font-extrabold text-[#008272]">
                      Rs. {quote.amount.toLocaleString()}
                    </div>
                    <div className="flex items-center sm:justify-end gap-1 text-xs text-slate-500 mt-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{quote.availability}</span>
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onViewWorkerProfile(quote.workerId || 'w-1')}
                    className="bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl border border-slate-300 transition-colors"
                  >
                    View profile
                  </button>

                  <button
                    onClick={() => onOpenMessages(quote)}
                    className="bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl border border-slate-300 transition-colors"
                  >
                    Message
                  </button>

                  <button
                    onClick={() => onChooseWorker(job.id, quote)}
                    className="bg-[#008272] hover:bg-[#007163] text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-xl transition-colors shadow-sm"
                  >
                    Choose worker
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Your Job Summary & Info */}
        <div className="space-y-4">
          {/* Your Job Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Your job</h3>
              <button
                onClick={onEditJob}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 border border-slate-200 px-2.5 py-1 rounded-lg"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit job</span>
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 leading-snug">{job.title}</h4>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="w-3 h-3" />
                <span>{job.town}</span>
              </div>
              <div className="text-xs text-slate-400">Posted by {job.customer?.name}</div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="text-xs text-slate-500">Budget (approx.)</div>
              <div className="text-2xl font-extrabold text-[#008272] mt-0.5">
                Rs. {job.budget?.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Info Banner (Mint Background) */}
          <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-2xl p-5 flex items-start gap-3 text-xs text-slate-700 shadow-sm">
            <Info className="w-4 h-4 text-[#008272] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Confirm the scope before choosing. You can message workers if you have any questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
