import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, AlertCircle, XCircle, MessageSquare, Wrench, ArrowRight } from 'lucide-react';

export default function MyBookings({ bookings, onCancelBooking, onCompleteBooking, onExploreMore }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400 mb-4">
          <Calendar className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No Active Bookings Yet</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
          Need an electrician, plumber, or handyman? Browse top professionals near you and schedule a service in minutes.
        </p>
        <button
          onClick={onExploreMore}
          className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
        >
          <span>Find Service Professionals</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Scheduled Services</h2>
          <p className="text-xs text-slate-500 mt-1">Manage, update, or track your upcoming electrician & home repair appointments.</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
          {bookings.length} Total Bookings
        </span>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => {
          const isCompleted = booking.status === 'Completed';
          const isCancelled = booking.status === 'Cancelled';

          return (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <img
                    src={booking.avatar}
                    alt={booking.providerName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{booking.providerName}</h3>
                    <p className="text-xs text-indigo-600 font-semibold">{booking.providerTitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isCancelled
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : isCancelled ? (
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    {booking.status}
                  </span>

                  <span className="text-base font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
                    {booking.totalEstimated}
                  </span>
                </div>
              </div>

              {/* Booking Body */}
              <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase block mb-1">Service</span>
                  <p className="font-bold text-slate-900 text-sm">{booking.serviceTitle}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase block mb-1">Schedule</span>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{booking.scheduledDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{booking.scheduledTime}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase block mb-1">Location</span>
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{booking.address}</span>
                  </div>
                </div>
              </div>

              {booking.notes && (
                <div className="mb-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                  <span className="font-bold text-slate-700">Client Note: </span>
                  {booking.notes}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Ref ID: {booking.id}</span>

                {!isCompleted && !isCancelled && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onCancelBooking(booking.id)}
                      className="px-3.5 py-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg font-semibold transition-colors"
                    >
                      Cancel Booking
                    </button>
                    <button
                      onClick={() => onCompleteBooking(booking.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-colors shadow-xs"
                    >
                      Mark Completed
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
