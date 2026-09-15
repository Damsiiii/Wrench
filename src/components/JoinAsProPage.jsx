import React, { useState } from 'react';
import { HardHat, CheckCircle2 } from 'lucide-react';

export default function JoinAsProPage({ onNavigateToFeed }) {
  const [submitted, setSubmitted] = useState(false);
  const [proForm, setProForm] = useState({
    businessName: '',
    trade: 'Electrician',
    licenseNumber: '',
    phone: '',
    email: '',
    serviceArea: 'Austin, TX (25 mile radius)'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="clay-card p-8 bg-white space-y-6">

        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-2xl clay-surface-amber flex items-center justify-center text-amber-950 font-bold mx-auto">
            <HardHat className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Join Wrench Pro Network</h1>
          <p className="text-xs text-slate-500 font-medium">
            Bid directly on real homeowner jobs in your local service area. Zero lead purchase fees.
          </p>
        </div>

        {submitted ? (
          <div className="clay-card clay-surface-emerald p-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-800 mx-auto" />
            <h2 className="text-lg font-black text-emerald-950">Application Received!</h2>
            <p className="text-xs text-emerald-900 font-bold max-w-md mx-auto">
              Our verification team will review your trade license ({proForm.licenseNumber}) within 24 hours. Once verified, you can submit itemized bids.
            </p>
            <button
              onClick={onNavigateToFeed}
              className="clay-button-primary px-5 py-2.5 text-xs"
            >
              Return to Live Feed
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Business / Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="Apex Electrical Services LLC"
                  value={proForm.businessName}
                  onChange={(e) => setProForm({ ...proForm, businessName: e.target.value })}
                  className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Primary Trade</label>
                <select
                  value={proForm.trade}
                  onChange={(e) => setProForm({ ...proForm, trade: e.target.value })}
                  className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800"
                >
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Handyman">Handyman</option>
                  <option value="HVAC Tech">HVAC Tech</option>
                  <option value="Painter">Painter</option>
                  <option value="Locksmith">Locksmith</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Trade License / Certification #</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master License #TX-99018"
                  value={proForm.licenseNumber}
                  onChange={(e) => setProForm({ ...proForm, licenseNumber: e.target.value })}
                  className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Service Radius / City</label>
                <input
                  type="text"
                  required
                  value={proForm.serviceArea}
                  onChange={(e) => setProForm({ ...proForm, serviceArea: e.target.value })}
                  className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Business Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="(512) 555-0199"
                  value={proForm.phone}
                  onChange={(e) => setProForm({ ...proForm, phone: e.target.value })}
                  className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Business Email</label>
                <input
                  type="email"
                  required
                  placeholder="contact@apexpro.com"
                  value={proForm.email}
                  onChange={(e) => setProForm({ ...proForm, email: e.target.value })}
                  className="w-full px-4 py-3 clay-input text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <button
                type="submit"
                className="clay-button-amber px-6 py-3 text-xs"
              >
                Submit Contractor Onboarding
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
