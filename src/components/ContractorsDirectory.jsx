import React, { useState } from 'react';
import { Star, ShieldCheck, HardHat, Award, MapPin, CheckCircle, Search, PhoneCall } from 'lucide-react';

export const PROS_LIST = [
  {
    id: 'pro-1',
    name: 'SparkCraft Electric',
    trade: 'Electrician',
    license: 'Master License #TX-882109',
    rating: 4.9,
    reviewsCount: 142,
    hourlyRate: 85,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    specialties: ['Main Panel Upgrades', 'EV Chargers', 'Recessed Lighting', 'Rewiring'],
    bio: 'Family-owned master electrical contractor servicing the metro area for 12+ years. 100% compliant with National Electrical Code (NEC).'
  },
  {
    id: 'pro-2',
    name: 'FlowMaster Plumbing',
    trade: 'Plumber',
    license: 'Master Plumbing License #MP-44120',
    rating: 5.0,
    reviewsCount: 215,
    hourlyRate: 95,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    specialties: ['Hydro-Jetting', 'Sewer Camera Inspection', 'Water Heaters', 'Leak Detection'],
    bio: 'Emergency plumbing specialists equipped with commercial hydro-jetting rigs, trenchless pipe repair equipment, and leak diagnostic cameras.'
  },
  {
    id: 'pro-3',
    name: 'FixIt Express Handyman',
    trade: 'Handyman',
    license: 'Insured & Bonded LLC',
    rating: 4.9,
    reviewsCount: 310,
    hourlyRate: 65,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    specialties: ['IKEA Furniture Assembly', 'TV Wall Mounting', 'Drywall Repair', 'Door Locksets'],
    bio: 'Precision handyman service focused on furniture assembly, mounting, wall anchoring, and home repairs with 5-star ratings.'
  },
  {
    id: 'pro-4',
    name: 'ClimateControl HVAC',
    trade: 'HVAC Tech',
    license: 'EPA 608 Universal Certified',
    rating: 4.8,
    reviewsCount: 94,
    hourlyRate: 90,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    specialties: ['AC Compressor Repair', 'Heat Pumps', 'Refrigerant Charge', 'Duct Work'],
    bio: 'EPA 608 Universal licensed HVAC technicians providing diagnostic testing, dual capacitor replacements, and high-efficiency AC tune-ups.'
  }
];

export default function ContractorsDirectory({ onOpenPostJob }) {
  const [tradeFilter, setTradeFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredPros = PROS_LIST.filter((pro) => {
    const matchesTrade = tradeFilter === 'All' || pro.trade === tradeFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      !query ||
      pro.name.toLowerCase().includes(query) ||
      pro.trade.toLowerCase().includes(query) ||
      pro.specialties.some((s) => s.toLowerCase().includes(query));

    return matchesTrade && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white tracking-tight">Verified Contractors Directory</h1>
        <p className="text-xs text-slate-400 mt-1">
          Browse licensed electricians, plumbers, and handymen participating in Wrench reverse-bidding.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pros by name, specialty, or trade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={tradeFilter}
          onChange={(e) => setTradeFilter(e.target.value)}
          className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-semibold text-white focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Trades</option>
          <option value="Electrician">Electricians</option>
          <option value="Plumber">Plumbers</option>
          <option value="Handyman">Handymen</option>
          <option value="HVAC Tech">HVAC Techs</option>
        </select>
      </div>

      {/* Pros Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPros.map((pro) => (
          <div
            key={pro.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start gap-4">
              <img
                src={pro.avatar}
                alt={pro.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/30"
              />
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-white">{pro.name}</h3>
                  <span className="text-emerald-400 font-mono font-bold text-sm">${pro.hourlyRate}/hr</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 rounded font-semibold border border-indigo-500/20">
                    {pro.trade}
                  </span>
                  <span className="text-slate-400 font-medium">{pro.license}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold">{pro.rating}</span>
                  <span className="text-slate-500">({pro.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              {pro.bio}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {pro.specialties.map((spec) => (
                <span key={spec} className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-[11px] font-medium">
                  {spec}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={onOpenPostJob}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Request Bid From Pro
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
