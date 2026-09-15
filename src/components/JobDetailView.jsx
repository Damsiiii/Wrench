import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Calendar,
  Wrench,
  FileText,
  Heart,
  ShieldCheck,
  ArrowRight,
  Send,
  ChevronRight
} from 'lucide-react';

export default function JobDetailView({
  job,
  onBack,
  onOpenSendQuote,
  onOpenMessages,
  userRole = 'worker',
  onAddQuestion
}) {
  const [saved, setSaved] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [questions, setQuestions] = useState(job.questions || []);

  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ = {
      id: `q-${Date.now()}`,
      asker: userRole === 'worker' ? 'Saman Kumara' : 'You',
      time: 'Just now',
      text: newQuestionText,
      reply: null
    };

    setQuestions([...questions, newQ]);
    if (onAddQuestion) onAddQuestion(job.id, newQ);
    setNewQuestionText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={onBack} className="hover:text-slate-800">
          Find work
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900">{job.category}</span>
      </div>

      {/* Main Grid: Job Details (Left) + Budget/Homeowner Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Job Info Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
          {/* Status Badge & Title */}
          <div className="space-y-2">
            <div>
              <span className="bg-[#e6f7f5] text-[#008272] text-xs font-bold px-3 py-1 rounded-full inline-flex items-center">
                {job.status === 'open' ? 'Open' : job.status === 'in_progress' ? 'In progress' : 'Completed'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {job.title}
            </h1>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-700" />
                {job.town}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-700" />
                {job.postedTime}
              </span>
            </div>
          </div>

          {/* Dual layout inside card: Photo left, Details right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div>
              <img
                src={job.photos[0]}
                alt={job.title}
                className="w-full h-64 sm:h-72 object-cover rounded-xl border border-slate-100 shadow-sm"
              />
              {job.photos.length > 1 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {job.photos.slice(1).map((p, idx) => (
                    <img
                      key={idx}
                      src={p}
                      alt={`Photo ${idx + 2}`}
                      className="w-full h-16 object-cover rounded-lg border border-slate-100"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-5 text-sm text-slate-700">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Job description</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      When do you need this done?
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">{job.timing}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Materials</div>
                    <div className="text-xs text-slate-600 mt-0.5">{job.materials}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Additional details</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      {job.additionalDetails}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Customer Sidebar */}
        <div className="space-y-4">
          {/* Card 1: Budget & Action (Mint Background) */}
          <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-2xl p-6 space-y-5 shadow-sm">
            <div>
              <div className="text-xs font-medium text-slate-600">
                Homeowner budget (approx.)
              </div>
              <div className="text-3xl font-black text-[#008272] tracking-tight mt-0.5">
                Rs. {job.budget?.toLocaleString()}
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => onOpenSendQuote(job)}
                className="w-full bg-[#008272] hover:bg-[#007163] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Send a quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSaved(!saved)}
                className="w-full bg-white hover:bg-slate-50 text-slate-800 font-semibold py-2.5 px-4 rounded-xl border border-slate-300 flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Heart
                  className={`w-4 h-4 ${saved ? 'text-red-500 fill-red-500' : 'text-slate-600'}`}
                />
                <span>{saved ? 'Saved job' : 'Save job'}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-[#cbf0ea] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center font-bold text-[#008272]">
                {job.customer.name.charAt(0)}
              </div>
              <div className="text-xs">
                <div className="text-slate-500">Posted by</div>
                <div className="font-bold text-slate-900 text-sm">{job.customer.name}</div>
                <div className="text-slate-500 flex items-center gap-1 mt-0.5">
                  <span>Member since {job.customer.memberSince}</span>
                  <span>•</span>
                  <span className="text-[#008272] font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Identity verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Location note */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Location</h4>
              <p className="text-sm font-semibold text-slate-800">{job.town}</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Exact address is not shown for privacy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Questions about this job */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">Questions about this job</h3>

        {/* Existing questions & answers */}
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="border border-slate-200 rounded-xl p-4 space-y-3">
              {/* Question */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {q.asker.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-500">
                    <span className="font-bold text-slate-900">{q.asker}</span> • {q.time}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800">{q.text}</p>
                </div>
              </div>

              {/* Reply if present (in mint box) */}
              {q.reply && (
                <div className="ml-6 sm:ml-11 bg-[#e6f7f5] border border-[#cbf0ea] rounded-xl p-3.5 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#008272] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {q.reply.author.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-slate-500">
                      <span className="font-bold text-slate-900">{q.reply.author}</span> •{' '}
                      {q.reply.time}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800">{q.reply.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Ask Question Input */}
        <form onSubmit={handlePostQuestion} className="flex gap-2 pt-2">
          <input
            type="text"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="Ask a question about this job..."
            className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008272]"
          />
          <button
            type="submit"
            className="bg-[#008272] hover:bg-[#007163] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
