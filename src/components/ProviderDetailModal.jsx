import React, { useState } from 'react';
import { X, Star, ShieldCheck, MapPin, Clock, Award, CheckCircle2, Calendar, MessageCircle, Heart, DollarSign, Zap } from 'lucide-react';

export default function ProviderDetailModal({
  provider,
  onClose,
  onStartBooking,
  isSaved,
  onToggleSave
}) {
  const [activeTab, setActiveTab] = useState('about');

  if (!provider) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="relative bg-slate-900 text-white p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
              />
              {provider.verified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-900">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-bold">{provider.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                  Verified Pro
                </span>
              </div>
              <p className="text-sm font-medium text-indigo-300 mt-1">{provider.title}</p>

              <div className="flex items-center gap-4 mt-3 text-xs text-slate-300 flex-wrap">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {provider.rating} ({provider.reviewCount} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {provider.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6">
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3.5 px-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'about'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Overview & Services
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 px-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Client Reviews ({provider.reviews?.length || 0})
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'about' ? (
            <>
              {/* Highlights & Badges */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Qualifications & Trust</h4>
                <div className="flex flex-wrap gap-2">
                  {provider.badges.map((badge, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About {provider.name}</h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {provider.bio}
                </p>
              </div>

              {/* Specialities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Specialties & Tasks Handled</h4>
                <div className="grid grid-cols-2 gap-2">
                  {provider.specialties.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 font-medium">
                      <Zap className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing breakdown box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-800 block">Transparent Direct Pricing</span>
                  <p className="text-xs text-emerald-700 mt-0.5">Includes standard tools and 30-day workmanship warranty.</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-900">${provider.hourlyRate}<span className="text-xs font-normal">/hr</span></div>
                  <span className="text-[10px] font-semibold text-emerald-700">${provider.minCalloutFee} base callout</span>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {provider.reviews && provider.reviews.length > 0 ? (
                provider.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                          {rev.author[0]}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">{rev.author}</span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-6">No client reviews yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleSave(provider.id)}
            className={`p-3 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition-colors ${
              isSaved
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onStartBooking(provider);
            }}
            className="flex-1 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Service with {provider.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
