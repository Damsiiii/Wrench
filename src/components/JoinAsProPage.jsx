import React, { useState } from 'react';
import { HardHat, ShieldCheck, CheckCircle2, Award, Zap } from 'lucide-react';

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
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">

        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <HardHat className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Join Wrench Pro Network</h1>
          <p className="text-xs text-slate-400">
            Bid directly on real homeowner jobs in your local service area. Zero lead purchase fees.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-lg font-bold text-white">Application Received!</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Our verification team will review your trade license ({proForm.licenseNumber}) within 24 hours. Once verified, you can submit itemized bids.
            </p>
            <button
              onClick={onNavigateToFeed}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
            >
              Return to Live Feed
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">Business / Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="Apex Electrical Services LLC"
                  value={proForm.businessName}
                  onChange={(e) => setProForm({ ...proForm, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">Primary Trade</label>
                <select
                  value={proForm.trade}
                  onChange={(e) => setProForm({ ...proForm, trade: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                <label className="block text-slate-300 font-bold mb-1.5">Trade License / Certification #</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master License #TX-99018"
                  value={proForm.licenseNumber}
                  onChange={(e) => setProForm({ ...proForm, licenseNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">Service Radius / City</label>
                <input
                  type="text"
                  required
                  value={proForm.serviceArea}
                  onChange={(e) => setProForm({ ...proForm, serviceArea: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">Business Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="(512) 555-0199"
                  value={proForm.phone}
                  onChange={(e) => setProForm({ ...proForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">Business Email</label>
                <input
                  type="email"
                  required
                  placeholder="contact@apexpro.com"
                  value={proForm.email}
                  onChange={(e) => setProForm({ ...proForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500"
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
