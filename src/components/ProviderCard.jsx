import React from 'react';
import { Star, ShieldCheck, MapPin, Clock, Heart, CheckCircle2, Award, Calendar, DollarSign, MessageSquare } from 'lucide-react';

export default function ProviderCard({
  provider,
  onSelectProvider,
  onQuickBook,
  isSaved,
  onToggleSave
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-indigo-200 transition-all overflow-hidden flex flex-col justify-between group">
      <div className="p-5 sm:p-6">
        {/* Top Header: Avatar, Name, Save button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3.5 items-center">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-xs"
              />
              {provider.verified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white" title="Verified Professional">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                  {provider.name}
                </h3>
              </div>
              <p className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                {provider.title}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(provider.id);
            }}
            className={`p-2 rounded-full border transition-all ${
              isSaved
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            title={isSaved ? "Remove from saved" : "Save professional"}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Rating and Experience metrics */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1 font-bold text-slate-900">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{provider.rating}</span>
            <span className="font-normal text-slate-500">({provider.reviewCount})</span>
          </div>

          <div className="h-3 w-px bg-slate-200" />

          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-indigo-500" />
            <span>{provider.yearsExp} yrs exp</span>
          </div>

          <div className="h-3 w-px bg-slate-200" />

          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{provider.completedJobs} jobs done</span>
          </div>
        </div>

        {/* Location & Availability */}
        <div className="mt-3.5 space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{provider.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="font-medium text-emerald-700">{provider.availability}</span>
            <span className="text-slate-400">• Responds {provider.responseTime}</span>
          </div>
        </div>

        {/* Bio Snippet */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {provider.bio}
        </p>

        {/* Badges / Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {provider.specialties.slice(0, 3).map((spec, i) => (
            <span key={i} className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
              {spec}
            </span>
          ))}
          {provider.specialties.length > 3 && (
            <span className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
              +{provider.specialties.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer / Pricing & Actions */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-slate-900">${provider.hourlyRate}</span>
            <span className="text-xs text-slate-500 font-medium">/ hr</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-medium">Min. callout ${provider.minCalloutFee}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectProvider(provider)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
          >
            View Profile
          </button>
          <button
            onClick={() => onQuickBook(provider)}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
