import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Check,
  CheckCircle,
  ShieldCheck,
  Briefcase,
  Calendar,
  MessageSquare,
  Lock,
  Edit2,
  Star,
  Home
} from 'lucide-react';

export default function ManageHiredJobPage({
  job,
  onBack,
  onOpenMessages,
  onViewWorkerProfile
}) {
  const [completed, setCompleted] = useState(job?.status === 'completed');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const worker = job?.quotes?.[0] || {
    workerName: 'Saman Kumara',
    workerRating: 4.8,
    workerReviewsCount: 27,
    workerTown: 'Kurunegala',
    workerAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    amount: 4500,
    appointmentDate: '18 Sep 2026 (Friday)',
    appointmentTime: 'Morning (8.00 am - 12.00 pm)'
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setReviewSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back to My Jobs */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>My jobs</span>
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {job?.title || 'Fix leaking bathroom pipe'}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {job?.town || 'Kurunegala'}
            </span>
            <span>|</span>
            <span>{job?.jobCode || 'Job #J1024'}</span>
            <span>|</span>
            <span>Posted 16 Sep 2026</span>
          </div>
        </div>

        {/* Status Pill */}
        <div className="bg-[#e6f7f5] text-[#008272] border border-[#cbf0ea] px-4 py-2 rounded-2xl flex items-center gap-2 self-start md:self-auto">
          <Clock className="w-4 h-4 text-[#008272]" />
          <div className="text-xs">
            <div className="font-bold">
              {completed ? 'Completed' : 'In progress'}
            </div>
            <div className="text-[11px] text-slate-600">
              {completed ? 'Job marked as completed' : 'Worker chosen • Next step: service'}
            </div>
          </div>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="relative flex items-center justify-between max-w-2xl mx-auto">
          {/* Connector Line */}
          <div className="absolute top-4 left-8 right-8 h-0.5 bg-slate-200 -z-0">
            <div
              className={`h-full bg-[#008272] transition-all duration-300 ${
                completed ? 'w-full' : 'w-1/2'
              }`}
            />
          </div>

          {/* Step 1: Posted */}
          <div className="flex flex-col items-center text-center relative z-10 space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#008272] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900">Posted</span>
            <span className="text-[10px] text-slate-500">16 Sep 2026</span>
          </div>

          {/* Step 2: Worker chosen */}
          <div className="flex flex-col items-center text-center relative z-10 space-y-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                completed
                  ? 'bg-[#008272] text-white'
                  : 'bg-[#008272] ring-4 ring-teal-100 text-white'
              }`}
            >
              {completed ? <Check className="w-4 h-4" /> : <div className="w-2.5 h-2.5 rounded-full bg-white" />}
            </div>
            <span className="text-xs font-bold text-slate-900">Worker chosen</span>
            <span className="text-[10px] text-slate-500">17 Sep 2026</span>
          </div>

          {/* Step 3: Completed */}
          <div className="flex flex-col items-center text-center relative z-10 space-y-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                completed ? 'bg-[#008272] text-white' : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              {completed ? <Check className="w-4 h-4" /> : <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />}
            </div>
            <span className="text-xs font-bold text-slate-900">Completed</span>
            <span className="text-[10px] text-slate-500">{completed ? 'Confirmed' : 'Pending'}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Your Worker (Left) & Job Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Worker info & primary action buttons */}
        <div className="lg:col-span-2 space-y-4">
          {/* Mint Worker Card */}
          <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-2xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Your worker</h2>
              <button
                onClick={() => onViewWorkerProfile('w-1')}
                className="text-xs font-bold text-[#008272] hover:text-[#006357] flex items-center gap-1"
              >
                <span>View worker profile</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start pt-1">
              {/* Worker Profile Bio */}
              <div className="flex items-start gap-4">
                <img
                  src={worker.workerAvatar}
                  alt={worker.workerName}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200 flex-shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">{worker.workerName}</h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{worker.workerRating}</span>
                    <span className="text-slate-400 font-normal">({worker.workerReviewsCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{worker.workerTown}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-600">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Plumbing</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#008272] font-semibold pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Identity verified</span>
                  </div>
                </div>
              </div>

              {/* Agreed quote & appointment box */}
              <div className="space-y-3 sm:border-l sm:border-[#cbf0ea] sm:pl-6">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Agreed quote</div>
                  <div className="text-2xl font-black text-[#008272]">
                    Rs. {worker.amount.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-600">Includes labour and fittings</div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <span>Appointment</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">
                    {worker.appointmentDate}
                  </div>
                  <div className="text-[11px] text-slate-600">{worker.appointmentTime}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenMessages}
              className="bg-[#008272] hover:bg-[#007163] text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message worker</span>
            </button>

            {!completed ? (
              <button
                onClick={handleComplete}
                className="bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm px-6 py-3 rounded-xl border border-slate-300 flex items-center gap-2 transition-colors shadow-sm"
              >
                <Check className="w-4 h-4 text-[#008272]" />
                <span>Mark completed</span>
              </button>
            ) : (
              <div className="bg-[#d1fae5] text-[#065f46] font-bold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Job Completed</span>
              </div>
            )}

            <button
              onClick={() => alert('Job cancellation requested.')}
              className="text-xs font-bold text-red-600 hover:text-red-700 underline ml-auto py-2"
            >
              Cancel job
            </button>
          </div>
        </div>

        {/* Right Column: Job Details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Job details</h3>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Edit2 className="w-3 h-3" /> Edit job
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs text-slate-700">
            <div className="py-2.5">
              <div className="text-slate-400 font-medium">Description</div>
              <p className="font-semibold text-slate-800 mt-0.5 leading-relaxed">
                {job?.description ||
                  'Water leaking from wash basin pipe. Need someone to fix and check for any other issues.'}
              </p>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Category</span>
              <span className="font-semibold text-slate-800">Plumbing</span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Location</span>
              <span className="font-semibold text-slate-800">{job?.town || 'Kurunegala'}</span>
            </div>

            {/* Verified Address with Lock */}
            <div className="py-2.5 space-y-1.5">
              <div className="text-slate-400 font-medium">Property address</div>
              <div className="flex items-start gap-2">
                <Home className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                <span className="font-bold text-slate-900">
                  {job?.address || '123 Perera Mawatha, Kurunegala 60000'}
                </span>
              </div>
              <div className="bg-[#e6f7f5] text-[#008272] text-[10px] font-bold px-2 py-1 rounded-md inline-flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Shared with your worker only</span>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Preferred date</span>
              <span className="font-semibold text-slate-800">18 Sep 2026 (Friday)</span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Preferred time</span>
              <span className="font-semibold text-slate-800">Morning (8.00 am – 12.00 pm)</span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Budget (original)</span>
              <span className="font-semibold text-slate-800">Rs. 5,000</span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Agreed quote</span>
              <span className="font-bold text-[#008272]">Rs. 4,500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: After Completion & Leave a Review */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-900">After completion</h3>
          <p className="text-xs text-slate-500">
            Once the job is complete, you can rate the worker and share your experience.
          </p>
        </div>

        {reviewSubmitted ? (
          <div className="bg-[#d1fae5] text-[#065f46] p-4 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Thank you! Your review has been submitted and added to the worker's profile.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmitReview}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start pt-2"
          >
            {/* 5 Stars Rating */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-800">Rate your experience</div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-slate-300 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review text */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Write a review (optional)</span>
                <span className="text-[10px] text-slate-400">{reviewText.length}/500</span>
              </div>
              <textarea
                rows={2}
                maxLength={500}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share what went well (or what could be better)..."
                className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none"
              />
              <p className="text-[10px] text-slate-400">
                Your review helps other people in the community.
              </p>
            </div>

            {/* Submit review button */}
            <div className="self-end pt-2">
              <button
                type="submit"
                disabled={!completed}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  completed
                    ? 'bg-[#008272] hover:bg-[#007163] text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {completed ? 'Submit review' : 'Mark completed to review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
