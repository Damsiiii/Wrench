import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import QuickServices from './components/QuickServices';
import ProviderCard from './components/ProviderCard';
import ProviderDetailModal from './components/ProviderDetailModal';
import BookingModal from './components/BookingModal';
import PostTaskModal from './components/PostTaskModal';
import BecomeProModal from './components/BecomeProModal';
import MyBookings from './components/MyBookings';

import { CATEGORIES, QUICK_SERVICES, PROVIDERS, MOCK_BOOKINGS } from './data/mockData';
import { Filter, Star, Check, Sparkles, Zap, Shield, PhoneCall, Heart, Search, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'bookings' | 'saved'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [minRatingFilter, setMinRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'rating' | 'price_asc' | 'price_desc'
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);

  // Data States
  const [savedProviderIds, setSavedProviderIds] = useState(['p1']);
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [userTasks, setUserTasks] = useState([]);

  // Modal States
  const [selectedProviderDetail, setSelectedProviderDetail] = useState(null);
  const [bookingProvider, setBookingProvider] = useState(null);
  const [prefilledTask, setPrefilledTask] = useState(null);
  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);
  const [isBecomeProOpen, setIsBecomeProOpen] = useState(false);

  // Toggle Save Provider
  const toggleSaveProvider = (id) => {
    setSavedProviderIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  // Filtered Professionals List
  const filteredProviders = useMemo(() => {
    return PROVIDERS.filter((pro) => {
      // Search term match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        pro.name.toLowerCase().includes(query) ||
        pro.title.toLowerCase().includes(query) ||
        pro.category.toLowerCase().includes(query) ||
        pro.bio.toLowerCase().includes(query) ||
        pro.specialties.some((s) => s.toLowerCase().includes(query));

      // Category match
      const matchesCategory = selectedCategory === 'all' || pro.category === selectedCategory;

      // Rating match
      const matchesRating = pro.rating >= minRatingFilter;

      // Availability match
      const matchesAvailability = !onlyAvailableToday || pro.availability.toLowerCase().includes('today');

      // Saved tab filter
      const matchesSaved = activeTab !== 'saved' || savedProviderIds.includes(pro.id);

      return matchesSearch && matchesCategory && matchesRating && matchesAvailability && matchesSaved;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price_desc') return b.hourlyRate - a.hourlyRate;
      return b.reviewCount - a.reviewCount; // Recommended (most reviews)
    });
  }, [searchQuery, selectedCategory, minRatingFilter, sortBy, onlyAvailableToday, activeTab, savedProviderIds]);

  // Handlers
  const handleQuickBookTask = (quickService) => {
    // Find matching provider or default
    const match = PROVIDERS.find((p) => p.category === quickService.category) || PROVIDERS[0];
    setBookingProvider(match);
    setPrefilledTask(quickService);
  };

  const handleConfirmNewBooking = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const handleCompleteBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Completed' } : b))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* Top Header / Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedProviderIds.length}
        onOpenPostTask={() => setIsPostTaskOpen(true)}
        onOpenBecomePro={() => setIsBecomeProOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Container */}
      <main className="flex-1">
        {activeTab === 'explore' || activeTab === 'saved' ? (
          <>
            {/* Hero Banner (Only on Explore tab) */}
            {activeTab === 'explore' && (
              <HeroSection
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenPostTask={() => setIsPostTaskOpen(true)}
              />
            )}

            {/* Micro-Services Bar */}
            {activeTab === 'explore' && !searchQuery && selectedCategory === 'all' && (
              <QuickServices
                quickServices={QUICK_SERVICES}
                onBookQuickService={handleQuickBookTask}
              />
            )}

            {/* Main Professionals Marketplace Section */}
            <section id="pros-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

              {/* Section Title & Filter Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    {activeTab === 'saved' ? (
                      <>
                        <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
                        <span>Saved Service Professionals ({filteredProviders.length})</span>
                      </>
                    ) : (
                      <>
                        <span>Verified Local Professionals</span>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                          {filteredProviders.length} Available
                        </span>
                      </>
                    )}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Licensed electricians, certified plumbers, and background-checked technicians ready for hire.
                  </p>
                </div>

                {/* Filter Toolbar */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  {/* Rating Filter */}
                  <select
                    value={minRatingFilter}
                    onChange={(e) => setMinRatingFilter(Number(e.target.value))}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={0}>All Ratings</option>
                    <option value={4.5}>4.5★ & Above</option>
                    <option value={4.8}>4.8★ Top Rated</option>
                  </select>

                  {/* Sort By */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="recommended">Sort: Most Popular</option>
                    <option value="rating">Sort: Highest Rated</option>
                    <option value="price_asc">Sort: Price Low to High</option>
                    <option value="price_desc">Sort: Price High to Low</option>
                  </select>

                  {/* Available Today Toggle */}
                  <button
                    onClick={() => setOnlyAvailableToday(!onlyAvailableToday)}
                    className={`px-3.5 py-2 rounded-xl border font-semibold transition-colors flex items-center gap-1.5 ${
                      onlyAvailableToday
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${onlyAvailableToday ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span>Available Today</span>
                  </button>
                </div>
              </div>

              {/* Providers Grid */}
              {filteredProviders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProviders.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onSelectProvider={(pro) => setSelectedProviderDetail(pro)}
                      onQuickBook={(pro) => {
                        setBookingProvider(pro);
                        setPrefilledTask(null);
                      }}
                      isSaved={savedProviderIds.includes(provider.id)}
                      onToggleSave={toggleSaveProvider}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8">
                  <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 text-base">No Professionals Match Criteria</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Try adjusting your category selection, search terms, or rating filter.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setMinRatingFilter(0);
                      setOnlyAvailableToday(false);
                    }}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-indigo-700"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </section>
          </>
        ) : (
          /* Bookings Tab View */
          <MyBookings
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onCompleteBooking={handleCompleteBooking}
            onExploreMore={() => setActiveTab('explore')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-lg mb-3">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>Wrench Services</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              On-demand platform connecting homeowners and businesses with background-verified electricians, plumbers, handymen, and specialists.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Popular Trades</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer" onClick={() => setSelectedCategory('electrician')}>Emergency Electricians</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setSelectedCategory('plumber')}>24/7 Leak & Pipe Plumbers</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setSelectedCategory('handyman')}>TV Mounting & Assembly</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setSelectedCategory('locksmith')}>Locksmith Services</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">For Professionals</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer" onClick={() => setIsBecomeProOpen(true)}>Become a Provider</li>
              <li className="hover:text-white cursor-pointer">Verification Standards</li>
              <li className="hover:text-white cursor-pointer">Partner Guarantee</li>
              <li className="hover:text-white cursor-pointer">Pro Dashboard</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Support & Safety</h4>
            <p className="mb-3">Need urgent help with an ongoing booking or quote?</p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>24/7 Safety Helpline</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center text-slate-500">
          © {new Date().getFullYear()} Wrench Service Marketplace Inc. All rights reserved.
        </div>
      </footer>

      {/* Modals */}
      {selectedProviderDetail && (
        <ProviderDetailModal
          provider={selectedProviderDetail}
          onClose={() => setSelectedProviderDetail(null)}
          onStartBooking={(pro) => {
            setSelectedProviderDetail(null);
            setBookingProvider(pro);
            setPrefilledTask(null);
          }}
          isSaved={savedProviderIds.includes(selectedProviderDetail.id)}
          onToggleSave={toggleSaveProvider}
        />
      )}

      {bookingProvider && (
        <BookingModal
          provider={bookingProvider}
          prefilledTask={prefilledTask}
          onClose={() => {
            setBookingProvider(null);
            setPrefilledTask(null);
          }}
          onConfirmBooking={handleConfirmNewBooking}
          onViewBookings={() => setActiveTab('bookings')}
        />
      )}

      {isPostTaskOpen && (
        <PostTaskModal
          categories={CATEGORIES}
          onClose={() => setIsPostTaskOpen(false)}
          onSubmitTask={(task) => setUserTasks((prev) => [task, ...prev])}
        />
      )}

      {isBecomeProOpen && (
        <BecomeProModal
          categories={CATEGORIES}
          onClose={() => setIsBecomeProOpen(false)}
        />
      )}
    </div>
  );
}
