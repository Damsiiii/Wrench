import React from 'react';
import {
  MapPin,
  Star,
  Briefcase,
  Languages,
  Calendar,
  MessageSquare,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_WORKERS } from '../data/mockData';

export default function WorkerProfilePage({
  workerId = 'w-1',
  onInviteToQuote,
  onOpenMessages
}) {
  const worker =
    INITIAL_WORKERS.find((w) => w.id === workerId) || INITIAL_WORKERS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row items-start justify-between gap-6">
        {/* Worker Details Left */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <img
            src={worker.avatar}
            alt={worker.name}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border border-slate-100 flex-shrink-0"
          />
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {worker.name}
            </h1>
            <div className="text-sm font-semibold text-slate-700">{worker.trade}</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{worker.town} and nearby towns</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 text-sm font-bold text-amber-500 pt-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{worker.rating}</span>
              <span className="text-xs text-slate-400 font-normal">
                ({worker.profileReviewsCount || 12} reviews)
              </span>
            </div>

            {/* 3 Meta items row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-700 pt-2 font-medium">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>{worker.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-slate-400" />
                <span>Speaks {worker.languages.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Available {worker.availability.replace('Available ', '')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons & Availability Right */}
        <div className="w-full lg:w-72 space-y-3 flex-shrink-0">
          <button
            onClick={() => onInviteToQuote(worker)}
            className="w-full bg-[#008272] hover:bg-[#007163] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
          >
            Invite to quote
          </button>

          <button
            onClick={() => onOpenMessages(worker)}
            className="w-full bg-white hover:bg-slate-50 text-slate-900 font-semibold py-2.5 px-4 rounded-xl border border-slate-300 flex items-center justify-center gap-2 transition-colors shadow-sm text-sm"
          >
            <MessageSquare className="w-4 h-4 text-slate-600" />
            <span>Message</span>
          </button>

          {/* Mint Availability Notice */}
          <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-xl p-3 flex items-start gap-2.5 text-xs">
            <Calendar className="w-4 h-4 text-[#008272] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900">Available this week</div>
              <div className="text-slate-600 text-[11px] mt-0.5">
                Usually responds within a few hours
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: About/Services/Previous Work (Left 2 cols) & Reviews (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">About</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{worker.about}</p>
          </div>

          {/* Services */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Services</h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {worker.services.map((srv, idx) => (
                <span
                  key={idx}
                  className="bg-[#e6f7f5] text-[#008272] text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  {srv}
                </span>
              ))}
            </div>
          </div>

          {/* Previous Work Gallery */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Previous work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {worker.previousWork.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-xl border border-slate-100 shadow-sm"
                  />
                  <div className="text-xs font-semibold text-slate-800 leading-tight">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Customer Reviews */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">Customer reviews</h2>

          <div className="space-y-4 divide-y divide-slate-100">
            {worker.reviews.map((rev) => (
              <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-[#008272] font-bold text-xs flex items-center justify-center">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{rev.author}</div>
                      <div className="text-[11px] text-slate-400">
                        {rev.town} • {rev.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{rev.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{rev.text}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => alert('Viewing all reviews.')}
              className="text-xs font-bold text-[#008272] hover:text-[#006357] flex items-center gap-1"
            >
              <span>See all {worker.profileReviewsCount || 12} reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
