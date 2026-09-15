import React, { useState } from 'react';
import { Menu, X, ChevronDown, User, Check, Layers } from 'lucide-react';

export function WrenchLogo({ className = "h-8" }) {
  return (
    <div className={`flex items-center gap-3 cursor-pointer select-none ${className}`}>
      {/* Brand Icon & Wordmark */}
      <div className="flex items-center">
        <svg viewBox="0 0 160 38" className="h-8 w-auto fill-current">
          {/* Stylized W with Wrench Head */}
          <path
            d="M 12 4 L 18 18 L 26 5 L 34 18 L 40 4 L 47 4 L 37 28 L 31 28 L 26 16 L 21 28 L 15 28 L 5 4 Z"
            className="text-slate-900"
            fill="currentColor"
          />
          {/* Teal Wrench Motif in W */}
          <path
            d="M 14 3 C 14 1.5 15.5 0 17 0 C 18.5 0 19.5 0.8 20 2 L 18 4 C 17.5 3.5 16.8 3.5 16.5 4 C 16.2 4.5 16.5 5.5 17 6 L 12 18 L 8 18 L 13 6 C 12.3 5 12.5 3.5 14 3 Z"
            fill="#008272"
          />
          {/* R E N C H */}
          <text
            x="48"
            y="26"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            fontSize="26"
            letterSpacing="0.5px"
            fill="#0f172a"
          >
            RENCH
          </text>
        </svg>
      </div>

      {/* Subtitle with separator */}
      <div className="hidden sm:flex items-center gap-2 border-l border-slate-300 pl-3">
        <span className="text-[11px] leading-tight text-slate-500 font-medium tracking-tight">
          Sri Lanka's<br />everyday jobs<br />marketplace
        </span>
      </div>
    </div>
  );
}

export default function Navbar({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenPostJob,
  onOpenSignIn,
  currentUser,
  jobCount = 0,
  unreadMessagesCount = 1
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const [quickJumpOpen, setQuickJumpOpen] = useState(false);

  const screens = [
    { id: 'home', label: '01 Home' },
    { id: 'find_work', label: '02 Find Work' },
    { id: 'job_details', label: '03 Job Details' },
    { id: 'post_job', label: '04 Post a Job' },
    { id: 'send_quote', label: '05 Send a Quote' },
    { id: 'compare_quotes', label: '06 Compare Quotes' },
    { id: 'customer_dashboard', label: '07 Customer Dashboard' },
    { id: 'worker_dashboard', label: '08 Worker Dashboard' },
    { id: 'manage_hired_job', label: '09 Manage Hired Job & Review' },
    { id: 'worker_directory', label: '10 Worker Directory' },
    { id: 'worker_profile', label: '11 Worker Profile' },
    { id: 'auth', label: '12 Sign In & Create Account' },
    { id: 'worker_setup', label: '13 Worker Profile Setup' },
    { id: 'messages', label: '14 Messages' },
    { id: 'settings_help', label: '15 Account Settings & Help' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Top Banner / Quick Jump Bar for testing all reference designs */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-[#008272] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            REFERENCE UI
          </span>
          <span className="hidden md:inline text-slate-300 text-[11px]">
            Mode:{' '}
            <strong className="text-white capitalize">
              {userRole === 'customer' ? 'Customer (Kasun Perera)' : 'Worker (Saman Kumara)'}
            </strong>
          </span>
          <button
            onClick={() => setUserRole(userRole === 'customer' ? 'worker' : 'customer')}
            className="text-[11px] underline text-teal-300 hover:text-white font-medium"
          >
            Switch to {userRole === 'customer' ? 'Worker' : 'Customer'} Mode
          </button>
        </div>

        {/* Quick Screen Selector */}
        <div className="relative">
          <button
            onClick={() => setQuickJumpOpen(!quickJumpOpen)}
            className="flex items-center gap-1.5 text-slate-200 hover:text-white font-medium text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
          >
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            <span>Jump to UI Screen ({screens.find((s) => s.id === activeTab)?.label || 'Menu'})</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {quickJumpOpen && (
            <div className="absolute right-0 mt-1 w-64 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 py-2 z-50 max-h-96 overflow-y-auto">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                15 Reference UI Boards
              </div>
              {screens.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => {
                    setActiveTab(screen.id);
                    setQuickJumpOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-teal-50 hover:text-[#008272] ${
                    activeTab === screen.id ? 'font-bold text-[#008272] bg-teal-50' : 'text-slate-700'
                  }`}
                >
                  <span>{screen.label}</span>
                  {activeTab === screen.id && <Check className="w-3.5 h-3.5 text-[#008272]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div onClick={() => setActiveTab('home')}>
            <WrenchLogo />
          </div>

          {/* Center & Right Navigation items */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <button
                onClick={() => setLang('SI')}
                className={`hover:text-slate-900 transition-colors ${lang === 'SI' ? 'font-bold text-slate-900' : ''}`}
              >
                සිංහල
              </button>
              <span>|</span>
              <button
                onClick={() => setLang('TA')}
                className={`hover:text-slate-900 transition-colors ${lang === 'TA' ? 'font-bold text-slate-900' : ''}`}
              >
                தமிழ்
              </button>
              <span>|</span>
              <button
                onClick={() => setLang('EN')}
                className={`hover:text-slate-900 transition-colors ${
                  lang === 'EN' ? 'font-bold text-[#008272]' : ''
                }`}
              >
                EN
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex items-center gap-6 text-sm font-semibold text-slate-700">
              <button
                onClick={() => setActiveTab('find_work')}
                className={`hover:text-[#008272] transition-colors ${
                  activeTab === 'find_work' ? 'text-[#008272] border-b-2 border-[#008272] pb-0.5' : ''
                }`}
              >
                Find work
              </button>

              <button
                onClick={() =>
                  setActiveTab(userRole === 'customer' ? 'customer_dashboard' : 'worker_dashboard')
                }
                className={`hover:text-[#008272] transition-colors ${
                  activeTab === 'customer_dashboard' || activeTab === 'worker_dashboard'
                    ? 'text-[#008272] border-b-2 border-[#008272] pb-0.5'
                    : ''
                }`}
              >
                {userRole === 'customer' ? 'My jobs' : 'My work'}
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`relative hover:text-[#008272] transition-colors ${
                  activeTab === 'messages' ? 'text-[#008272] border-b-2 border-[#008272] pb-0.5' : ''
                }`}
              >
                Messages
                {unreadMessagesCount > 0 && (
                  <span className="absolute -top-1 -right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('worker_directory')}
                className={`hover:text-[#008272] transition-colors ${
                  activeTab === 'worker_directory' ? 'text-[#008272] border-b-2 border-[#008272] pb-0.5' : ''
                }`}
              >
                Workers
              </button>

              <button
                onClick={() => setActiveTab('settings_help')}
                className={`flex items-center gap-1.5 hover:text-[#008272] transition-colors ${
                  activeTab === 'settings_help' ? 'text-[#008272]' : ''
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700">
                  <User className="w-4 h-4" />
                </div>
              </button>
            </nav>

            {/* Post a Job CTA button */}
            <button onClick={onOpenPostJob} className="btn-primary">
              Post a job
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenPostJob}
              className="bg-[#008272] text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
            >
              Post a job
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
            <span className="text-slate-500">Language:</span>
            <div className="flex gap-3 font-semibold">
              <span onClick={() => setLang('SI')} className={lang === 'SI' ? 'text-teal-700' : ''}>සිංහල</span>
              <span onClick={() => setLang('TA')} className={lang === 'TA' ? 'text-teal-700' : ''}>தமிழ்</span>
              <span onClick={() => setLang('EN')} className={lang === 'EN' ? 'text-teal-700 font-bold' : ''}>EN</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 font-medium text-sm text-slate-800">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#008272]"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveTab('find_work');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#008272]"
            >
              Find work
            </button>
            <button
              onClick={() => {
                setActiveTab(userRole === 'customer' ? 'customer_dashboard' : 'worker_dashboard');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#008272]"
            >
              {userRole === 'customer' ? 'My jobs' : 'My work'}
            </button>
            <button
              onClick={() => {
                setActiveTab('messages');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#008272]"
            >
              Messages
            </button>
            <button
              onClick={() => {
                setActiveTab('worker_directory');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#008272]"
            >
              Browse Workers
            </button>
            <button
              onClick={() => {
                setActiveTab('settings_help');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#008272]"
            >
              Account & Help
            </button>
            <button
              onClick={() => {
                setActiveTab('auth');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#008272]"
            >
              Sign in / Create account
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
