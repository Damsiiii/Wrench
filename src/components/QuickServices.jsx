import React from 'react';
import { Zap, Droplets, Wrench, KeyRound, Tv, Thermometer, Box, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const QUICK_ICON_MAP = {
  Droplets,
  Tv,
  Zap,
  KeyRound,
  Box,
  Thermometer
};

export default function QuickServices({ quickServices, onBookQuickService }) {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            Instant Fixed-Price Tasks
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Popular Micro-Services Ready to Book
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Standard household micro-tasks with clear estimated pricing and fast response.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickServices.map((service) => {
          const IconComponent = QUICK_ICON_MAP[service.icon] || Wrench;

          return (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {service.duration}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Est. Starting Price</span>
                  <span className="text-lg font-extrabold text-slate-900">${service.estPrice}</span>
                </div>

                <button
                  onClick={() => onBookQuickService(service)}
                  className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Book Task</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
