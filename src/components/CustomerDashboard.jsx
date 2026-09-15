import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
  User,
  Calendar,
  Phone,
  HelpCircle,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function CustomerDashboard({
  jobs,
  onSelectJob,
  onOpenPostJob,
  onCompareQuotes,
  onManageHiredJob,
  onLeaveReview,
  onOpenHelp
}) {
  const [activeTab, setActiveTab] = useState('open'); // 'open' | 'in_progress' | 'completed'

  const openJobs = jobs.filter((j) => j.status === 'open');
  const inProgressJobs = jobs.filter((j) => j.status === 'in_progress');
  const completedJobs = jobs.filter((j) => j.status === 'completed');

  const currentList =
    activeTab === 'open' ? openJobs : activeTab === 'in_progress' ? inProgressJobs : completedJobs;

  // Upcoming visit (first in-progress job or mock upcoming)
  const upcomingJob = inProgressJobs[0] || jobs[1];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header with Post a job CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My jobs</h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Track your jobs, chat with workers and get things done.
          </p>
        </div>

        <button onClick={onOpenPostJob} className="btn-primary self-start sm:self-auto">
          <span>Post a job</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('open')}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === 'open'
              ? 'text-[#008272] border-b-2 border-[#008272]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Open ({openJobs.length})
        </button>

        <button
          onClick={() => setActiveTab('in_progress')}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === 'in_progress'
              ? 'text-[#008272] border-b-2 border-[#008272]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          In progress ({inProgressJobs.length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === 'completed'
              ? 'text-[#008272] border-b-2 border-[#008272]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Completed ({completedJobs.length})
        </button>
      </div>

      {/* Main Grid: Job Cards (Left 2 cols) & Upcoming Visit Sidebar (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Job Cards List */}
        <div className="lg:col-span-2 space-y-4">
          {currentList.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
              <p className="text-slate-600 text-sm font-medium">No jobs in this section.</p>
              <button onClick={onOpenPostJob} className="btn-primary text-xs">
                Post your first job
              </button>
            </div>
          ) : (
            currentList.map((job) => {
              const quoteCount = job.quotes?.length || 0;
              return (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition-all"
                >
                  {/* Thumbnail & Job Details */}
                  <div className="flex items-start gap-4">
                    <img
                      src={job.photos[0]}
                      alt={job.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.town}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {job.postedTime}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 max-w-md pt-0.5 leading-relaxed">
                        {job.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                        <User className="w-3.5 h-3.5" />
                        <span>Posted by {job.customer?.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Status Badge, Price & CTA */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 flex-shrink-0 gap-3">
                    {/* Status Badge */}
                    {job.status === 'open' && (
                      <span className="bg-[#e6f7f5] text-[#008272] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{quoteCount} new quotes</span>
                      </span>
                    )}

                    {job.status === 'in_progress' && (
                      <span className="bg-[#fef3c7] text-[#92400e] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>In progress</span>
                      </span>
                    )}

                    {job.status === 'completed' && (
                      <span className="bg-[#d1fae5] text-[#065f46] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    )}

                    {/* Price */}
                    <div className="sm:text-right">
                      <div className="text-base sm:text-lg font-extrabold text-slate-900">
                        Rs. {job.budget?.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        Budget (approx.)
                      </div>
                    </div>

                    {/* Action Button */}
                    {job.status === 'open' && (
                      <button
                        onClick={() => onCompareQuotes(job)}
                        className="bg-[#008272] hover:bg-[#007163] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-1 transition-colors shadow-sm"
                      >
                        <span>View quotes</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {job.status === 'in_progress' && (
                      <button
                        onClick={() => onManageHiredJob(job)}
                        className="bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl border border-slate-300 flex items-center gap-1 transition-colors shadow-sm"
                      >
                        <span>View job</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {job.status === 'completed' && (
                      <button
                        onClick={() => onLeaveReview(job)}
                        className="bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl border border-slate-300 flex items-center gap-1 transition-colors shadow-sm"
                      >
                        <span>Leave a review</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Upcoming visit & Help widget */}
        <div className="space-y-4">
          {/* Upcoming visit card */}
          {upcomingJob && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">Upcoming visit</h3>

              <div className="flex items-center gap-3">
                <img
                  src={upcomingJob.photos[0]}
                  alt={upcomingJob.title}
                  className="w-16 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                />
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {upcomingJob.title}
                </h4>
              </div>

              <div className="space-y-2 text-xs text-slate-700 pt-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Wed, 18 Sep 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>9:00 AM – 11:00 AM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{upcomingJob.town}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="font-bold text-slate-900">
                      {upcomingJob.hiredQuote?.workerName || 'Nimal Perera'}
                    </span>
                    <span className="text-slate-500 block text-[11px]">Assigned worker</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#008272] font-bold">
                  <Phone className="w-4 h-4" />
                  <span>{upcomingJob.hiredQuote?.workerPhone || '076 123 4567'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onManageHiredJob(upcomingJob)}
                  className="w-full bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs sm:text-sm py-2 px-3 rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View job</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Need help card */}
          <div
            onClick={onOpenHelp}
            className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-slate-300 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Need help?</h4>
                <p className="text-[11px] text-slate-500">Message us anytime.</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
