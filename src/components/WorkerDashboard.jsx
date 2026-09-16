import React, { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Calendar,
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

export default function WorkerDashboard({
  jobs = [],
  currentUser,
  onWithdraw,
  onNavigateToFindWork,
  onSelectJob,
  onManageHiredJob,
}) {
  const [activeTab, setActiveTab] = useState("my_quotes"); // 'my_quotes' | 'hired_jobs' | 'completed'

  const all = jobs.flatMap((job) =>
    job.quotes
      .filter((q) => q.workerId === currentUser.id)
      .map((q) => ({
        ...q,
        jobId: job.id,
        title: job.title,
        town: job.town,
        postedTime: job.postedTime,
        homeowner: job.customer.name,
        description: job.description,
        photo: job.photos[0],
        jobStatus: job.status,
        acceptedTime: q.appointmentDate,
      })),
  );
  const myQuotes =
    activeTab === "my_quotes" ? all.filter((q) => q.status !== "accepted") : [];
  const upcomingJobs = all.filter(
    (q) =>
      q.status === "accepted" &&
      q.jobStatus === (activeTab === "completed" ? "completed" : "in_progress"),
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My work
          </h1>
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
          onClick={() => setActiveTab("my_quotes")}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === "my_quotes"
              ? "text-[#008272] border-b-2 border-[#008272]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          My quotes{" "}
          <span className="ml-1 bg-teal-50 text-[#008272] px-2 py-0.5 rounded-full text-xs">
            {all.filter((q) => q.status !== "accepted").length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("hired_jobs")}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === "hired_jobs"
              ? "text-[#008272] border-b-2 border-[#008272]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Hired jobs{" "}
          <span className="ml-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
            {
              all.filter(
                (q) => q.status === "accepted" && q.jobStatus === "in_progress",
              ).length
            }
          </span>
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === "completed"
              ? "text-[#008272] border-b-2 border-[#008272]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Completed{" "}
          <span className="ml-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
            {
              all.filter(
                (q) => q.jobStatus === "completed" && q.status === "accepted",
              ).length
            }
          </span>
        </button>
      </div>

      {activeTab === "my_quotes" && (
        <>
          {/* Section 1: My quotes */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">My quotes</h2>
              <p className="text-xs text-slate-500">
                Jobs you've quoted on. Keep track of their status.
              </p>
            </div>

            <div className="space-y-4">
              {!myQuotes.length && <p>No quotes yet.</p>}
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
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {item.title}
                      </h3>
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
                    {item.status === "pending" ? (
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
                      <div className="text-xs text-slate-500 font-medium">
                        Your quote
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-[#008272]">
                        Rs. {item.amount.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectJob({ id: item.jobId })}
                        className={
                          item.status === "pending"
                            ? "bg-[#111827] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-colors"
                            : "bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl border border-slate-300 transition-colors"
                        }
                      >
                        View quote
                      </button>

                      {item.status === "pending" && (
                        <button
                          onClick={() => onWithdraw(item.jobId, item.id)}
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
        </>
      )}
      {activeTab !== "my_quotes" && (
        <>
          {/* Section 2: Upcoming jobs */}
          <div className="space-y-4 pt-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {activeTab === "completed" ? "Completed jobs" : "Upcoming jobs"}
              </h2>
              <p className="text-xs text-slate-500">
                Jobs you've been hired for. These are upcoming or in progress.
              </p>
            </div>

            <div className="space-y-4">
              {!upcomingJobs.length && <p>No jobs here yet.</p>}
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
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {item.title}
                      </h3>
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
                      <span>
                        {item.jobStatus === "completed"
                          ? "Completed"
                          : "Accepted"}
                      </span>
                    </span>

                    <div className="sm:text-right">
                      <div className="text-xs text-slate-500 font-medium">
                        Agreed price
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-[#008272]">
                        Rs. {item.amount.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onManageHiredJob({
                          id: item.jobId,
                          title: item.title,
                          town: item.town,
                        })
                      }
                      className="bg-[#111827] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-6 py-2 rounded-xl transition-colors shadow-sm"
                    >
                      View job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
