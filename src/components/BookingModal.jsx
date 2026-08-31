import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, FileText, CreditCard, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BookingModal({
  provider,
  prefilledTask,
  onClose,
  onConfirmBooking,
  onViewBookings
}) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    serviceTitle: prefilledTask?.title || (provider ? `${provider.title} Service` : 'Home Maintenance Service'),
    date: defaultDate,
    timeSlot: '10:00 AM - 12:00 PM',
    address: '742 Evergreen Terrace, Springfield',
    notes: '',
    paymentMethod: 'card'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = {
        id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        providerId: provider?.id || 'p1',
        providerName: provider?.name || 'Assigned Local Specialist',
        providerTitle: provider?.title || 'Certified Technician',
        avatar: provider?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
        category: provider?.category || 'general',
        serviceTitle: formData.serviceTitle,
        scheduledDate: formData.date,
        scheduledTime: formData.timeSlot,
        address: formData.address,
        status: 'Confirmed',
        totalEstimated: provider ? `$${provider.hourlyRate + 25}.00` : `$${prefilledTask?.estPrice || 85}.00`,
        notes: formData.notes,
        createdAt: new Date().toISOString().split('T')[0]
      };

      onConfirmBooking(newBooking);
      setIsSubmitting(false);
      setBookingComplete(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100">

        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!bookingComplete ? (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Schedule Service</span>
              <h3 className="text-xl font-bold mt-1">Book Professional Appointment</h3>
            </div>
          ) : (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Success</span>
              <h3 className="text-xl font-bold mt-1">Booking Confirmed!</h3>
            </div>
          )}
        </div>

        {!bookingComplete ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            {/* Target Provider Summary */}
            {provider && (
              <div className="flex items-center gap-3 p-3 bg-indigo-50 border border-indigo-100 rounded-2xl">
                <img src={provider.avatar} alt={provider.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{provider.name}</h4>
                  <p className="text-xs text-indigo-700 font-medium">{provider.title} • ${provider.hourlyRate}/hr</p>
                </div>
              </div>
            )}

            {/* Service / Task Title */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Service Request Title
              </label>
              <input
                type="text"
                required
                value={formData.serviceTitle}
                onChange={(e) => setFormData({ ...formData, serviceTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Fix leaking shower head"
              />
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Preferred Window
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                  <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                  <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                </select>
              </div>
            </div>

            {/* Service Address */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Service Address
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Full address where work should be done"
              />
            </div>

            {/* Instructions / Notes */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Additional Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Gate codes, parking info, specific issue details..."
              />
            </div>

            {/* Price Guarantee Notice */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5 text-xs text-slate-600">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Wrench Guarantee:</span> Pay only after the job is completed to your satisfaction. Cancel free up to 2 hours before the window.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Book</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-xl font-bold text-slate-900">Your Appointment is Set!</h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              We have notified {provider ? provider.name : 'the provider'}. You will receive SMS updates and can track your booking status under 'My Bookings'.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{formData.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-bold text-slate-900">{formData.date} ({formData.timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="font-bold text-slate-900 truncate max-w-[200px]">{formData.address}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                if (onViewBookings) onViewBookings();
              }}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              Done & View My Bookings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
