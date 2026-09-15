import React, { useState } from 'react';
import {
  User,
  HardHat,
  LogOut,
  ChevronDown,
  ChevronUp,
  Headphones,
  FileText,
  MessageSquare,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { TOWNS, FAQS } from '../data/mockData';

export default function AccountSettingsAndHelpPage({
  currentUser,
  onNavigateToWorkerSetup,
  onSignOut
}) {
  const [activeSection, setActiveSection] = useState('settings'); // 'settings' | 'how_it_works'
  const [roleHelpTab, setRoleHelpTab] = useState('customers'); // 'customers' | 'workers'
  const [openFaq, setOpenFaq] = useState('faq-1');

  // Form State
  const [fullName, setFullName] = useState(currentUser?.name || 'Kasun Perera');
  const [email, setEmail] = useState('kasun.p******@gmail.com');
  const [town, setTown] = useState('Kurunegala');
  const [preferredLang, setPreferredLang] = useState('Sinhala');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Segmented Switcher between 15A and 15B */}
      <div className="flex items-center justify-center">
        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
          <button
            onClick={() => setActiveSection('settings')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSection === 'settings'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            15A. Account settings
          </button>
          <button
            onClick={() => setActiveSection('how_it_works')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSection === 'how_it_works'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            15B. How WRENCH works
          </button>
        </div>
      </div>

      {activeSection === 'settings' ? (
        /* 15A: Account Settings */
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Account settings
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Manage your profile, preferences and notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Your details Form */}
            <form
              onSubmit={handleSaveSettings}
              className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-5 shadow-sm"
            >
              <h2 className="text-lg font-bold text-slate-900">Your details</h2>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Full name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Town / City</label>
                <div className="relative">
                  <select
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#008272] focus:outline-none appearance-none"
                  >
                    {TOWNS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Preferred Language Radio */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-800">Preferred language</label>
                <div className="flex items-center gap-6">
                  {['Sinhala', 'Tamil', 'English'].map((lang) => (
                    <label
                      key={lang}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="preferredLang"
                        checked={preferredLang === lang}
                        onChange={() => setPreferredLang(lang)}
                        className="w-4 h-4 text-[#008272] focus:ring-[#008272]"
                      />
                      <span>{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              {savedSuccess && (
                <div className="bg-[#d1fae5] text-[#065f46] text-xs font-bold p-3 rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Changes saved successfully!</span>
                </div>
              )}

              <button
                type="submit"
                className="bg-[#008272] hover:bg-[#007163] text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm text-sm"
              >
                Save changes
              </button>
            </form>

            {/* Right Column: Profile type & Worker Prompt */}
            <div className="space-y-4">
              {/* Profile Type (Mint Background) */}
              <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-2xl p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900">Profile type</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-[#008272] flex items-center justify-center shadow-sm flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">I'm a customer</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      Post jobs and find trusted local workers for your home.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => alert('Customer profile editor opened.')}
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-300 transition-colors"
                >
                  Edit profile
                </button>
              </div>

              {/* Also a worker? Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Also a worker?</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Create a worker profile to offer your services and find work.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onNavigateToWorkerSetup}
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-300 transition-colors"
                >
                  Create worker profile
                </button>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={onSignOut}
                className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 font-bold py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-xs"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 15B: How WRENCH works */
        <div className="space-y-8">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How WRENCH works
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              A simple way to get things done, or find work, in your local area.
            </p>
          </div>

          {/* Customer / Worker Segmented Pill */}
          <div className="flex items-center justify-center">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 w-72">
              <button
                onClick={() => setRoleHelpTab('customers')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  roleHelpTab === 'customers'
                    ? 'bg-[#e6f7f5] text-[#008272] shadow-sm font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                For customers
              </button>
              <button
                onClick={() => setRoleHelpTab('workers')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  roleHelpTab === 'workers'
                    ? 'bg-[#e6f7f5] text-[#008272] shadow-sm font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                For workers
              </button>
            </div>
          </div>

          {/* 3 Step Visual Graphic Box (Mint background matching Board 15B) */}
          <div className="bg-[#e6f7f5] border border-[#cbf0ea] rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative items-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#008272] shadow-sm">
                    <FileText className="w-7 h-7" />
                  </div>
                  <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-[#008272] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {roleHelpTab === 'customers' ? 'Post a job' : 'Find work'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
                  {roleHelpTab === 'customers'
                    ? 'Tell us what you need, add some details and set your budget.'
                    : 'Browse local jobs in your trade and area, completely free.'}
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#008272] shadow-sm">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-[#008272] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {roleHelpTab === 'customers' ? 'Compare quotes' : 'Send a quote'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
                  {roleHelpTab === 'customers'
                    ? 'Receive quotes from local workers and chat if needed.'
                    : 'Provide your itemized price, inclusions and available schedule.'}
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#008272] shadow-sm">
                    <UserCheck className="w-7 h-7" />
                  </div>
                  <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-[#008272] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {roleHelpTab === 'customers' ? 'Choose a worker' : 'Get hired & paid'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
                  {roleHelpTab === 'customers'
                    ? 'Pick the right person for your job and get it done.'
                    : 'Coordinate directly on the platform and earn guaranteed customer reviews.'}
                </p>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
              <button
                onClick={() => alert('Support contacted.')}
                className="bg-white hover:bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-sm"
              >
                <Headphones className="w-3.5 h-3.5 text-slate-600" />
                <span>Contact support</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? '' : faq.id)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-slate-900 hover:text-[#008272] transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
