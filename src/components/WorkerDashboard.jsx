import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  Calendar,
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

export default function WorkerDashboard({
  onNavigateToFindWork,
  onSelectJob,
  onManageHiredJob
}) {
  const [activeTab, setActiveTab] = useState('my_quotes'); // 'my_quotes' | 'hired_jobs' | 'completed'

  const myQuotes = [
    {
      id: 'wq-1',
      jobId: 'job-1',
      title: 'Fix leaking bathroom pipe',
      town: 'Kurunegala',
      postedTime: 'Posted 2 hours ago',
      homeowner: 'Kasun Perera',
      description:
        'Water leaking from wash basin pipe. Need someone to fix and check for any other issues.',
      photo:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
      status: 'pending',
      amount: 4500
    },
    {
      id: 'wq-2',
      jobId: 'job-3',
      title: 'Paint living room',
      town: 'Mawathagama',
      postedTime: 'Posted 1 day ago',
      homeowner: 'Nimal Silva',
      description:
        'Need to paint living room (approx. 12 ft x 15 ft). Walls only. Paint will be provided.',
      photo:
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80',
      status: 'not_selected',
      amount: 12000
    }
  ];

  const upcomingJobs = [
    {
      id: 'uj-1',
      jobId: 'job-6',
      title: 'Replace kitchen tap',
      town: 'Kandy',
      acceptedTime: 'Accepted Sep 18, 2024 at 10:15 AM',
      homeowner: 'Anura Fernando',
      description: 'Old kitchen tap is leaking. Need to replace with new tap (customer will provide).',
      photo:
        'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80',
      status: 'accepted',
      amount: 6000
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My work</h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Manage your quotes, jobs and upcoming work.
          </p>
        </div>

        <button
          onClick={onNavigateToFindWork}
          className="btn-primary self-start sm:self-auto"
        >
          <Search className="w-4 h-4" />
          <span>Find work</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('my_quotes')}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === 'my_quotes'
              ? 'text-[#008272] border-b-2 border-[#008272]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          My quotes <span className="ml-1 bg-teal-50 text-[#008272] px-2 py-0.5 rounded-full text-xs">2</span>
        </button>

        <button
          onClick={() => setActiveTab('hired_jobs')}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === 'hired_jobs'
              ? 'text-[#008272] border-b-2 border-[#008272]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Hired jobs <span className="ml-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">1</span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === 'completed'
              ? 'text-[#008272] border-b-2 border-[#008272]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Completed <span className="ml-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">3</span>
        </button>
      </div>

      {/* Section 1: My quotes */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">My quotes</h2>
          <p className="text-xs text-slate-500">Jobs you've quoted on. Keep track of their status.</p>
        </div>

        <div className="space-y-4">
          {myQuotes.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition-all"
            >
              {/* Thumbnail & Info */}
              <div className="flex items-start gap-4">
                <img
                  src={item.photo}
                  alt={item.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.town}
                    </span>
                    <span>|</span>
                    <span>{item.postedTime}</span>
                    <span>|</span>
                    <span>By {item.homeowner}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 max-w-md pt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Status, Price & CTA */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 flex-shrink-0 gap-3">
                {item.status === 'pending' ? (
                  <span className="bg-[#ffedd5] text-[#9a3412] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Pending</span>
                  </span>
                ) : (
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Not selected</span>
                  </span>
                )}

                <div className="sm:text-right">
                  <div className="text-xs text-slate-500 font-medium">Your quote</div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#008272]">
                    Rs. {item.amount.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectJob({ id: item.jobId })}
                    className={
                      item.status === 'pending'
                        ? 'bg-[#111827] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-colors'
                        : 'bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl border border-slate-300 transition-colors'
                    }
                  >
                    View quote
                  </button>

                  {item.status === 'pending' && (
                    <button
                      onClick={() => alert('Quote withdrawn.')}
                      className="bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl border border-slate-300 transition-colors"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Upcoming jobs */}
      <div className="space-y-4 pt-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Upcoming jobs</h2>
          <p className="text-xs text-slate-500">
            Jobs you've been hired for. These are upcoming or in progress.
          </p>
        </div>

        <div className="space-y-4">
          {upcomingJobs.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition-all"
            >
              {/* Thumbnail & Info */}
              <div className="flex items-start gap-4">
                <img
                  src={item.photo}
                  alt={item.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.town}
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.acceptedTime}
                    </span>
                    <span>|</span>
                    <span>By {item.homeowner}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 max-w-md pt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Status, Price & CTA */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 flex-shrink-0 gap-3">
                <span className="bg-[#d1fae5] text-[#065f46] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Accepted</span>
                </span>

                <div className="sm:text-right">
                  <div className="text-xs text-slate-500 font-medium">Agreed price</div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#008272]">
                    Rs. {item.amount.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => onManageHiredJob({ id: item.jobId, title: item.title, town: item.town })}
                  className="bg-[#111827] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-6 py-2 rounded-xl transition-colors shadow-sm"
                >
                  View job
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
